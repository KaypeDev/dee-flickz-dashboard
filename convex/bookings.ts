import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createBookings = mutation({
    args: {
        clientId: v.id("clients"),
        scheduledAt: v.number(),
        eventLocation: v.string(),
        message: v.string(),
    },
    handler: async (ctx, { clientId, scheduledAt, eventLocation, message }) => {
        const bookingId = await ctx.db.insert('bookings', {
            clientId,
            scheduledAt,
            eventLocation,
            message,
            status: 'pending',
        });
        return bookingId;
    }
})