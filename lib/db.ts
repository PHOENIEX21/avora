import postgres from "postgres";

const globalForDb = globalThis as unknown as { sql?: ReturnType<typeof postgres> };

export const sql =
  globalForDb.sql ??
  postgres(process.env.DATABASE_URL || "", {
    ssl: "require",
    max: 3,
    idle_timeout: 30,
    connect_timeout: 8
  });

if (process.env.NODE_ENV !== "production") globalForDb.sql = sql;


export async function withDbRetry<T>(work: () => Promise<T>, attempts = 2): Promise<T> {
  let last: unknown;
  for (let i = 0; i < attempts; i++) {
    try { return await work(); } catch (error: any) {
      last = error;
      const code = String(error?.code || error?.cause?.code || '');
      const message = String(error?.message || '');
      const transient = /CONNECT_TIMEOUT|ETIMEDOUT|ECONNRESET|ECONNREFUSED|connection/i.test(code + ' ' + message);
      if (!transient || i === attempts - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 250 * (i + 1)));
    }
  }
  throw last;
}
