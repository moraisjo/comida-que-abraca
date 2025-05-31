import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  sub?: string; // subject = email
  userId?: string;
};

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch {
    return null;
  }
}