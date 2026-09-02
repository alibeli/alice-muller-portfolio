import { v } from "convex/values";

import { internal } from "./_generated/api";
import { internalMutation, action, query } from "./_generated/server";
import { sendTransactionalEmail } from "./lib/emails/sendEmail";
import { portfolioNotifyEmails } from "./lib/notifyAdmins";
import { normalizeEmail } from "./lib/normalizeEmail";

export const recordProjectView = internalMutation({
  args: {
    email: v.string(),
    projectSlug: v.string(),
    projectTitle: v.string(),
  },
  handler: async (ctx, args) => {
    const normalizedEmail = normalizeEmail(args.email);
    if (!normalizedEmail) {
      throw new Error("Enter a valid email address");
    }

    const now = Date.now();
    const existing = await ctx.db
      .query("visitors")
      .withIndex("by_normalized_email", (q) => q.eq("normalizedEmail", normalizedEmail))
      .unique();

    let visitorId = existing?._id;

    if (existing) {
      await ctx.db.patch(existing._id, {
        email: args.email.trim(),
        lastSeenAt: now,
      });
    } else {
      visitorId = await ctx.db.insert("visitors", {
        email: args.email.trim(),
        normalizedEmail,
        firstSeenAt: now,
        lastSeenAt: now,
      });
    }

    if (!visitorId) {
      throw new Error("Could not create visitor profile");
    }

    const viewId = await ctx.db.insert("projectViews", {
      visitorId,
      projectSlug: args.projectSlug,
      projectTitle: args.projectTitle,
      viewedAt: now,
    });

    const allViews = await ctx.db
      .query("projectViews")
      .withIndex("by_visitor", (q) => q.eq("visitorId", visitorId))
      .collect();

    const uniqueProjects = new Set(allViews.map((view) => view.projectSlug));

    return {
      visitorId,
      viewId,
      normalizedEmail,
      totalViews: allViews.length,
      uniqueProjectCount: uniqueProjects.size,
      viewedAt: now,
    };
  },
});

export const requestProjectAccess = action({
  args: {
    email: v.string(),
    projectSlug: v.string(),
    projectTitle: v.string(),
  },
  handler: async (ctx, args): Promise<{
    normalizedEmail: string;
    totalViews: number;
    uniqueProjectCount: number;
  }> => {
    const result: {
      visitorId: string;
      viewId: string;
      normalizedEmail: string;
      totalViews: number;
      uniqueProjectCount: number;
      viewedAt: number;
    } = await ctx.runMutation(internal.portfolioAccess.recordProjectView, {
      email: args.email,
      projectSlug: args.projectSlug,
      projectTitle: args.projectTitle,
    });

    const notifyTo = portfolioNotifyEmails();
    if (notifyTo.length > 0) {
      const viewedAt = new Date(result.viewedAt).toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
        timeZone: "Europe/Zurich",
      });

      await sendTransactionalEmail({
        to: notifyTo,
        subject: `Portfolio view: ${args.projectTitle}`,
        text: [
          `${result.normalizedEmail} opened "${args.projectTitle}" (${args.projectSlug}).`,
          `Time: ${viewedAt}`,
          `Total views by this visitor: ${result.totalViews}`,
          `Distinct projects viewed: ${result.uniqueProjectCount}`,
        ].join("\n"),
        html: `
          <p><strong>${result.normalizedEmail}</strong> opened
          <strong>${args.projectTitle}</strong> (<code>${args.projectSlug}</code>).</p>
          <p>Time: ${viewedAt}</p>
          <p>Total views by this visitor: ${result.totalViews}<br/>
          Distinct projects viewed: ${result.uniqueProjectCount}</p>
        `,
      });
    } else {
      console.warn("AILO_SUPPORT_ADMINS not set — view recorded but no owner email sent");
    }

    return {
      normalizedEmail: result.normalizedEmail,
      totalViews: result.totalViews,
      uniqueProjectCount: result.uniqueProjectCount,
    };
  },
});

/** Optional — inspect a visitor's project view history (public read for now). */
export const getVisitorHistory = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    const normalizedEmail = normalizeEmail(args.email);
    if (!normalizedEmail) return null;

    const visitor = await ctx.db
      .query("visitors")
      .withIndex("by_normalized_email", (q) => q.eq("normalizedEmail", normalizedEmail))
      .unique();

    if (!visitor) return null;

    const views = await ctx.db
      .query("projectViews")
      .withIndex("by_visitor", (q) => q.eq("visitorId", visitor._id))
      .order("desc")
      .collect();

    return {
      email: visitor.email,
      firstSeenAt: visitor.firstSeenAt,
      lastSeenAt: visitor.lastSeenAt,
      views: views.map((view) => ({
        projectSlug: view.projectSlug,
        projectTitle: view.projectTitle,
        viewedAt: view.viewedAt,
      })),
    };
  },
});
