import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const COOKIE_NAME = "assignment_nepal_admin";

function secret() {
  const value = process.env.ADMIN_JWT_SECRET;
  if (!value || value.length < 24) {
    throw new Error("ADMIN_JWT_SECRET must be set to a long random value.");
  }
  return new TextEncoder().encode(value);
}

export async function createAdminSession(admin: { id: string; email: string; role: string }) {
  const token = await new SignJWT({ email: admin.email, role: admin.role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(admin.id)
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(secret());

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const verified = await jwtVerify(token, secret());
    const admin = await prisma.adminUser.findUnique({
      where: { id: verified.payload.sub },
      select: { id: true, name: true, email: true, role: true },
    });
    return admin;
  } catch {
    return null;
  }
}

export async function verifyAdminCredentials(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin?.passwordHash) return null;
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return null;
  return { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
}
