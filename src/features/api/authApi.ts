import { apiClient } from "./apiClient";

/**
 * 서버와 사용자 동기화
 * 
 * @returns true 동기화 성공, false 동기화 실패
 */
export async function syncMeToServer(idToken: string | null): Promise<Boolean> {
    if (!idToken) {
        throw new Error("로그인 상태가 아닙니다.");
    }

    const res = await apiClient.post(
        `/api/users/sync`, //url
        {}, //body
        { //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });
    return Boolean(res.data.success)
}

/**
 * 이메일 유효성 체크
 */
export async function checkValidEmail(email: string) {
    return apiClient.get(`/api/users/exists?email=${email}`)
}
