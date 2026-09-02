import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  visitors: defineTable({
    email: v.string(),
    normalizedEmail: v.string(),
    firstSeenAt: v.number(),
    lastSeenAt: v.number(),
  }).index("by_normalized_email", ["normalizedEmail"]),

  projectViews: defineTable({
    visitorId: v.id("visitors"),
    projectSlug: v.string(),
    projectTitle: v.string(),
    viewedAt: v.number(),
  })
    .index("by_visitor", ["visitorId"])
    .index("by_visitor_and_slug", ["visitorId", "projectSlug"]),
});
