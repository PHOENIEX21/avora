import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.AUTH_SECRET || "dev-only-change-me");
const COOKIE = "avora_session";

export type Session = { userId: string; role: string; email: string; name?: string };

export async function createSession(payload: Session) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
  const store = await cookies();
  store.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key);
    return payload as unknown as Session;
  } catch {
    return null;
  }
}

export async function clearSession() {
  (await cookies()).delete(COOKIE);
}
