import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values";

const clients = defineTable({
    email: v.string(),
    phone: v.string(),
    name: v.string(),
}).index("by_email_and_phone", ["email", "phone"]);

const bookings = defineTable({
    clientId: v.id("clients"),
    scheduledAt: v.number(),
    eventLocation: v.string(),
    message: v.string(),
    status: v.string(),
})
.index("by_status", ["status"])
.index("by_status_and_scheduledAt", ["status", "scheduledAt"]);

const users = defineTable({
    email: v.string(),
});

const client_lookup_attempts = defineTable({
    email: v.string(),
    phone: v.string(),
    timestamp: v.number(),
})
    .index("by_email", ["email"])
    .index("by_phone", ["phone"]);

export default defineSchema({
    clients,
    bookings,
    users,
    client_lookup_attempts,
})

