
import type { UserInfo } from '../types/local/UserInfo';
import type { RemoteUserInfo } from '../types/remote/RemoteUserInfo'

/**
 * 문자열(string)에 공백이 있을 때 그 공백 기준으로 줄바꿈
 */
export function wrapBySpace(text: string): string {
  return text.replace(/ /g, '\n');
}

/**
 * DB 데이터를 클라이언트 요구 사항에 맞춰 가공 후 전달
 */
export function converToUsers(users: RemoteUserInfo[]): UserInfo[] {
  const data = users.map(user => ({
    uid: user.uid,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    lastLoginAt: user.last_login_at ?? '-',
    logoutAt: user.logout_at ?? '-',
    passwordResetAt: user.password_reset_at ?? "-",
    deletedAt: user.deleted_at ?? "-"
  }));
  return data;
}

export function converToUser(user: RemoteUserInfo): UserInfo {
  const data: UserInfo = {
    uid: user.uid,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: "-",
    updatedAt: "-",
    lastLoginAt: "-",
    logoutAt: "-",
    passwordResetAt: "-",
    deletedAt: "-"
  };
  return data;
}