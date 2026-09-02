import { v } from "convex/values";

import { internal } from "./_generated/api";
import { internalAction, internalMutation, action, query } from "./_generated/server";
import { portfolioNotifyEmails } from "./lib/notifyAdmins";
import { normalizeEmail } from "./lib/normalizeEmail";
import { sendPortfolioViewAlert, type ViewedProject } from "./lib/portfolioViewEmail";

function uniqueViewedProjects(
  views: Array<{ projectSlug: string; projectTitle: string; viewedAt: number }>,
): ViewedProject[] {
  const bySlug = new Map<string, ViewedProject>();
  for (const view of views) {
    if (!bySlug.has(view.projectSlug)) {
      bySlug.set(view.projectSlug, {
        slug: view.projectSlug,
        title: view.projectTitle,
      });
    }
  }
  return Array.from(bySlug.values());
}

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

    const viewedProjects = uniqueViewedProjects(allViews);

    return {
      visitorId,
      viewId,
      normalizedEmail,
      totalViews: allViews.length,
      uniqueProjectCount: viewedProjects.length,
      viewedProjects,
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
      viewedProjects: ViewedProject[];
      viewedAt: number;
    } = await ctx.runMutation(internal.portfolioAccess.recordProjectView, {
      email: args.email,
      projectSlug: args.projectSlug,
      projectTitle: args.projectTitle,
    });

    const notifyTo = portfolioNotifyEmails();
    if (notifyTo.length > 0) {
      await sendPortfolioViewAlert(notifyTo, {
        normalizedEmail: result.normalizedEmail,
        projectTitle: args.projectTitle,
        projectSlug: args.projectSlug,
        viewedAt: result.viewedAt,
        viewedProjects: result.viewedProjects,
        totalViews: result.totalViews,
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

/** Sends a sample alert using the same template as real project views. */
export const sendTestPortfolioViewAlert = internalAction({
  args: {},
  handler: async () => {
    const notifyTo = portfolioNotifyEmails();
    if (notifyTo.length === 0) {
      throw new Error("AILO_SUPPORT_ADMINS is not set in Convex environment variables");
    }

    const sent = await sendPortfolioViewAlert(notifyTo, {
      normalizedEmail: "test.visitor@example.com",
      projectTitle: "Ailo",
      projectSlug: "ailo",
      viewedAt: Date.now(),
      viewedProjects: [
        { slug: "ailo", title: "Ailo" },
        { slug: "metavogue", title: "MetaVogue" },
      ],
      totalViews: 3,
    });

    if (!sent) {
      throw new Error("RESEND_API_KEY is not set — email was not sent");
    }

    return { sentTo: notifyTo, resendId: sent.id };
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
