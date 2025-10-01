import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { query } from "./_generated/server";

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
});

export const updateBookingStatus = mutation({
    args: {
        bookingId: v.id('bookings'),
        status: v.union(
            v.literal('pending'),
            v.literal('confirmed'),
            v.literal('cancelled'),
            v.literal('removed'),
        ),
    },
    handler: async (ctx, { bookingId, status }) => {
        if (!ctx.auth) {
            throw new Error("Unauthorized");
        } else {
            await ctx.db.patch(bookingId, { status })
        }
    },
});

export const updateBookingDetails = mutation({
    args: {
        bookingId: v.id('bookings'),
        scheduledAt: v.number(),
        eventLocation: v.string(),
        message: v.string(),
    },
    handler: async (ctx, { bookingId, scheduledAt, eventLocation, message }) => {
        if (!ctx.auth) {
            throw new Error("Unauthorized");
        } else {
            await ctx.db.patch(bookingId, { scheduledAt, eventLocation, message });
        }
    },
});

export const getPendingBookings = query({
    args: {
        sortBy: v.optional(
            v.union(
                v.literal('recentToOld'),
                v.literal('oldToRecent'),
                v.literal('soonestToLatest'),
                v.literal('latestToSoonest'),
            )
        ),
        cursor: v.optional(v.any()),
    },
    handler: async (ctx, args) => {
        if (!ctx.auth) {
            throw new Error("Unauthorized");
        }
        const sortBy = args.sortBy ?? "soonestToLatest";

        if (sortBy === 'recentToOld' || sortBy === 'oldToRecent') {
            const direction = sortBy === 'recentToOld' ? 'desc' : 'asc';
            return await ctx.db
                .query("bookings")
                .withIndex("by_status", (q) => q.eq('status', 'pending'))
                .order(direction)
                .paginate({ cursor: args.cursor, numItems: 5 });
        }

        if (sortBy === 'soonestToLatest') {
            return await ctx.db
                .query("bookings")
                .withIndex("by_status_and_scheduledAt", (q) =>
                    q.eq("status", "pending")
                )
                .order('asc')
                .paginate({ cursor: args.cursor, numItems: 5 });
        }

        if (sortBy === "latestToSoonest") {
            const results = await ctx.db
                .query("bookings")
                .withIndex("by_status_and_scheduledAt", (q) => q.eq("status", "pending"))
                .order("desc")
                .collect();

            return {
                page: results.slice(0, 5), 
                isDone: results.length <= 5,
                continueCursor: null, 
            };
        }
    },
});
