import jwt from "jsonwebtoken";

const SECRET = process.env.APP_SECRET || "dev-secret";

export function signSession(email: string) {
  return jwt.sign({ email }, SECRET, { expiresIn: "30d" });
}

export function verifySession(token?: string): { email: string } | null {
  if (!token) return null;
  try {
    return jwt.verify(token, SECRET) as any;
  } catch {
    return null;
  }
}
