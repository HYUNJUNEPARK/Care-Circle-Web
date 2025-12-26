import { apiClient } from "./apiClient";

const userApiUrl = `/api/users`

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
        {}, //body
        { //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

    return Boolean(res.data.success);
}

/**
 * 이메일 유효성 체크
 */
export async function checkValidEmail(email: string) {
    return apiClient.get(`${userApiUrl}/exists?email=${email}`);
}

/**
 * 회원탈퇴
 */
export async function delelteUserByUid(idToken: string | undefined | null): Promise<Boolean> {
    if (!idToken) {
        throw new Error("idToken is null.");
    }

    const res = await apiClient.delete(
        `${userApiUrl}`, //url
        { //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

    return Boolean(res.data.success);
}