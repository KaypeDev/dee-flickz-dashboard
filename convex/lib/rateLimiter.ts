import type { DatabaseReader, DatabaseWriter } from "../_generated/server";

export async function checkRateLimiter({
    db,
    table,
    identifier,
    maxAttempts,
    windowMs,
}: {
    db: DatabaseReader | DatabaseWriter;
    table: 'client_lookup_attempts';
    identifier: { [key: string]: string };
    maxAttempts: number;
    windowMs: number;
}) {
    const now = Date.now();

    const [field, value] = Object.entries(identifier)[0];

    const recentAttempts = await db
        .query(table)
        .withIndex(`by_${field}` as any, (q) => q.eq(field, value))
        .collect();

    const recentFailed = recentAttempts.filter(
        (attempt) => now - attempt.timestamp < windowMs
    );

    if (recentFailed.length >= maxAttempts) {
        const retryAfterMs = windowMs - (now - recentFailed[0].timestamp);
        return { allowed: false, retryAfterMs };
    }

    return { allowed: true }
}

export async function recordAttempt({
    db,
    table,
    identifier,
}: {
    db: DatabaseWriter;
    table: "client_lookup_attempts";
    identifier: { email: string; phone: string };
}) {
    await db.insert(table, {
        ...identifier,
        timestamp: Date.now(),
    })
}