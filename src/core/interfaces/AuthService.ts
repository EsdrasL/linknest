export interface AuthService {
  createSession(userId: string): Promise<void>;
  deleteSession(): Promise<void>;
}
