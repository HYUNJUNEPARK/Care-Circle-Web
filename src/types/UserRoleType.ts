export type UserRole = 'ADMIN' | 'USER';

export function isUserRole(value: unknown): value is UserRole {
  return value === 'USER' || value === 'ADMIN';
}