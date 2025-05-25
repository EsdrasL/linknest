import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { AuthService } from "@/core/interfaces/AuthService";

type Session = {
  userId: string;
  expiresAt: Date;
};

export class JwtCookieAuthService implements AuthService {
  private sessionSecret = process.env.SESSION_SECRET;

  async createSession(userId: string): Promise<void> {
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await this.encrypt({ userId, expiresAt });
    const cookieStore = await cookies();

    cookieStore.set("session", session, {
      httpOnly: true,
      secure: true,
      expires: expiresAt,
      sameSite: "lax",
      path: "/",
    });
  }

  async verifySession(): Promise<string | null> {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("session");
    if (!cookie) {
      return null;
    }

    const session = await this.decrypt(cookie.value);
    if (!session?.userId) {
      return null;
    }

    return session.userId;
  }

  async deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete("session");
  }

  private getAuthKey() {
    return new TextEncoder().encode(this.sessionSecret);
  }

  private async encrypt(payload: Session): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(payload.expiresAt)
      .sign(this.getAuthKey());
  }

  private async decrypt(input: string): Promise<Session | null> {
    try {
      const { payload } = await jwtVerify<Session>(input, this.getAuthKey(), {
        algorithms: ["HS256"],
      });
      return payload;
    } catch (error) {
      return null;
    }
  }
}
