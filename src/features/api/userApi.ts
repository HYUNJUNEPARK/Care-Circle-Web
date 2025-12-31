import { apiClient } from './apiClient';
import type { UserStatusType } from '../../types/UserStatusType';
import type { UserInfo } from '../../types/UserInfo'
import type { RemoteUserInfo } from '../../types/RemoteUserInfo'

const userApiUrl = `/api/users`

/**
 * 전체 사용자 조회
 */
export async function getAllUsers(idToken: string | undefined | null): Promise<UserInfo[]> {
    if (!idToken) {
        throw new Error("idToken is null.");
    }

    const res = await apiClient.get(
        `${userApiUrl}`, //url
        {                //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const remoteUsers = res.data.data as RemoteUserInfo[]

    const users: UserInfo[] = remoteUsers.map(user => ({
        uid: user.uid,
        email: user.email,
        role: user.role,
        status: user.status,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
        lastLoginAt: user.last_login_at
    }))

    return users;
}

/**
 * 서버와 사용자 동기화
 * 
 * @returns true 동기화 성공, false 동기화 실패
 */
export async function syncMeToServer(idToken: string | undefined | null): Promise<Boolean> {
    if (!idToken) {
        throw new Error("idToken is null.");
    }

    const res = await apiClient.post(
        `${userApiUrl}/sync`, //url
        {},                   //body
        {                     //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    return Boolean(res.data.success);
}

/**
 * 이메일 유효성 체크
 */
export async function checkValidEmail(email: string) {
    return apiClient.get(`${userApiUrl}/exists?email=${email}`);
}

/**
 * 회원탈퇴(영구 삭제)
 */
export async function delelteUserByUid(idToken: string | undefined | null): Promise<Boolean> {
    if (!idToken) {
        throw new Error("idToken is null.");
    }

    const res = await apiClient.delete(
        `${userApiUrl}`, //url
        {                //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    return Boolean(res.data.success);
}

/**
 * 회원 상태 변경
 */
export async function changeStatus(
    idToken: string | undefined | null,
    uid: string,
    userStatus: UserStatusType,
): Promise<Boolean> {
    if (!idToken) {
        throw new Error("idToken is null.");
    }

    const res = await apiClient.patch(
        `${userApiUrl}/status`, //url
        {
            uid: uid,
            status: userStatus  //body
        },
        {                       //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    return Boolean(res.data.success);
}

/**
 * 로그인 사용자 정보 로딩
 */
export async function getLoginUserInfo(
    idToken: string | undefined | null,
) {
    if (!idToken) {
        throw new Error("idToken is null.");
    }

    const res = await apiClient.get(
        `${userApiUrl}/logged-in`,
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    return res.data.data;
}