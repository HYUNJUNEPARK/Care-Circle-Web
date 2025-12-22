import { apiClient } from "./apiClient";

/**
 * 서버와 사용자 동기화
 */
export async function syncMeToServer(idToken: string | null) {
    if (!idToken) {
        throw new Error("로그인 상태가 아닙니다.");
    }

    const res = await apiClient.post( //url, body, headers
        `/api/users/sync`,
        {},
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        });

    console.log('API 응답:', res.data);

}
