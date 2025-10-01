import { mutation } from './_generated/server';
import { v, ConvexError } from 'convex/values';
import { checkRateLimiter, recordAttempt } from './lib/rateLimiter';
import { query } from "./_generated/server";

export const createClient = mutation({
  args: {
    email: v.string(),
    phone: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('clients', args);
  },
});

export const getClientById = query({
  args: { id: v.id("clients") },
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const getClientByEmailPhoneWithLimit = mutation({
  args: {
    email: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, { email, phone }) => {
    const maxAttempts = 5;
    const windowMs = 15 * 60 * 1000;

    const emailLimit = await checkRateLimiter({
      db: ctx.db,
      table: 'client_lookup_attempts',
      identifier: { email },
      maxAttempts,
      windowMs,
    })

      if (!emailLimit.allowed) {
      const wait = Math.ceil((emailLimit.retryAfterMs ?? 0) / 60000);
      throw new ConvexError({
        type: 'rate_limit',
        field: 'email',
        message: `Too many attempts. Try again in ${wait} minutes.`,
        retryAfterMinutes: wait,
      });
    }

    const phoneLimit = await checkRateLimiter({
      db: ctx.db,
      table: 'client_lookup_attempts',
      identifier: { phone },
      maxAttempts,
      windowMs,
    })

     if (!phoneLimit.allowed) {
      const wait = Math.ceil((phoneLimit.retryAfterMs ?? 0) / 60000);
      throw new ConvexError({
        type: 'rate_limit',
        field: 'phone',
        message: `Too many attempts. Try again in ${wait} minutes.`,
        retryAfterMinutes: wait,
      });
     }


    const client = await ctx.db
      .query("clients")
      .withIndex("by_email_and_phone", (q) =>
        q.eq("email", email).eq("phone", phone)
      )
      .first();

    if (!client) {
      await recordAttempt({
        db: ctx.db,
        table: "client_lookup_attempts",
        identifier: { email, phone },
      });
    }

    return client;
  },
});