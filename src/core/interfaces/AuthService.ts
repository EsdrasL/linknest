export interface AuthService {
  createSession(userId: string): Promise<void>;
  verifySession(): Promise<string | null>;
  deleteSession(): Promise<void>;
}
