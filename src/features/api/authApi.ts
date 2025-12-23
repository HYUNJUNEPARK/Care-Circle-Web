import { apiClient } from "./apiClient";

/**
 * 서버와 사용자 동기화
 */
export async function syncMeToServer(idToken: string | null) {
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

    console.log('API 응답:', res.data);
}

/**
 * 이메일 유효성 체크
 */
export async function checkValidEmail(email: string) {
    return apiClient.get(`/api/users/exists?email=${email}`)
}
