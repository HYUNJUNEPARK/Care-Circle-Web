import privateAxios from '../axios/privateAxios';
import publicAxios from '../axios/publicAxios';
import type { UserInfo } from '../../types/local/UserInfo';
import type { RemoteUserInfo } from '../../types/remote/RemoteUserInfo'
import type SignOutResponse from '../../types/remote/SignOutResponse';
import { converToUser } from '../../utils/formatter';

const userApiUrl = `/api/users`

/**
 * 서버와 사용자 동기화
 * firebase auth 인증 토큰을 이용하여 서버와 동기화 처리
 * 
 * @returns true 동기화 성공, false 동기화 실패
 */
export async function syncMeToServer(): Promise<Boolean> {
    const res = await privateAxios.post(
        `${userApiUrl}/sync`,
        {},
        {},
    );
    return Boolean(res.data.success);
}

/**
 * 로그아웃(일반 사용자용) - 자기자신 로그아웃
 */
export async function signOut(): Promise<SignOutResponse> {
    const res = await privateAxios.post(
        `${userApiUrl}/sign-out`
    );
    const data = (res.data) as SignOutResponse;
    return data;
}


/**
 * 이메일 유효성 체크
 */
export async function checkValidEmail(email: string) {
    return publicAxios.get(`${userApiUrl}/exists?email=${email}`);
}

/**
 * 로그인 사용자 정보 로딩
 */
export async function getLoginUserInfo(): Promise<UserInfo> {
    const res = await privateAxios.get(
        `${userApiUrl}/sign-in`,
    );
    const rUser = (res.data.data) as RemoteUserInfo
    const user = converToUser(rUser)
    return user;
}
