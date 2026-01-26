import privateAxios from '../axios/privateAxios';
import publicAxios from '../axios/publicAxios';
import type { UserInfo } from '../../types/local/UserInfo';
import type { RemoteUserInfo } from '../../types/remote/RemoteUserInfo'
import type UpdateUserRoleResponse from '../../types/remote/UpdateUserRoleResponse';
import type DeleteUserResponse from '../../types/remote/DeleteUserStatusResponse';
import type SignOutResponse from '../../types/remote/SignOutResponse';
import type ResetPasswordResponse from '../../types/remote/ResetPasswordResponse';
import type { UserRole } from '../../types/UserRoleType';
import { converToUsers, converToUser } from '../../utils/formatter';

const userApiUrl = `/api/users`

/**
 * 전체 사용자 조회
 */
export async function getAllUsers(): Promise<UserInfo[]> {
    const res = await privateAxios.get(
        `${userApiUrl}`,
    );

    const remoteUsers = (res.data.data) as RemoteUserInfo[];
    const users = converToUsers(remoteUsers);
    return users;
}

/**
 * Email or Uid 로 사용자 검색 
 */
export async function searchUsersByEmailOrUid(keyword: string): Promise<UserInfo[]> {
    const res = await privateAxios.get(
        `${userApiUrl}/search?keyword=${keyword}`,
    );
    const remoteUsers = (res.data.data) as RemoteUserInfo[];
    const users = converToUsers(remoteUsers);
    return users;
}

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
 * 계정 삭제
 */
export async function deleteUser(uid: string): Promise<DeleteUserResponse> {
    const res = await privateAxios.delete(
        `${userApiUrl}/${uid}`,
    );
    const data = (res.data) as DeleteUserResponse;
    return data;
}

/**
 * 회원 상태 변경
 */
export async function updateUserRole(
    uid: string,
    role: UserRole,
): Promise<UpdateUserRoleResponse> {
    const res = await privateAxios.patch(
        `${userApiUrl}/role`,
        {
            uid: uid,
            role: role
        },
    );
    const data = (res.data) as UpdateUserRoleResponse;
    return data;
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

/**
 * 비밀번호 초기화
 */
export async function resetPassword(uid: string): Promise<ResetPasswordResponse> {
    const res = await privateAxios.post(
        `${userApiUrl}/password-reset`, 
        {                    
            uid: uid
        },
    );
    const data = (res.data) as ResetPasswordResponse;
    return data;
}
