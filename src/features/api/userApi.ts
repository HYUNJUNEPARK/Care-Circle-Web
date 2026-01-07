import { apiClient } from './apiClient';
import type { UserStatusType } from '../../types/UserStatusType';
import type { UserInfo } from '../../types/UserInfo';
import type { RemoteUserInfo } from '../../types/remote/RemoteUserInfo'
import type ChangeUserStatusResponse from '../../types/remote/ChangeStatusResponse';
import type UpdateUserRoleResponse from '../../types/remote/UpdateUserRoleResponse';
import type DeleteUserResponse from '../../types/remote/DeleteUserStatusResponse';
import type SignOutResponse from '../../types/remote/SignOutResponse';
import type ResetPasswordResponse from '../../types/remote/ResetPasswordResponse';
import type { UserRole } from '../../types/UserRoleType';
import { converToUsers, converToUser } from '../../utils/formatter';

const userApiUrl = `/api/users`

const tokenErrorMessage = 'IdToken is null.';

/**
 * 전체 사용자 조회
 */
export async function getAllUsers(
    idToken: string | undefined | null
): Promise<UserInfo[]> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }

    const res = await apiClient.get(
        `${userApiUrl}`, //url
        {                //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const remoteUsers = (res.data.data) as RemoteUserInfo[];
    const users = converToUsers(remoteUsers);
    return users;
}

/**
 * Email or Uid 로 사용자 검색 
 */
export async function searchUsersByEmailOrUid(
    idToken: string | undefined | null,
    keyword: string
): Promise<UserInfo[]> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }

    const res = await apiClient.get(
        `${userApiUrl}/search?keyword=${keyword}`,
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const remoteUsers = (res.data.data) as RemoteUserInfo[];
    const users = converToUsers(remoteUsers);
    return users;
}

/**
 * 서버와 사용자 동기화
 * 
 * @returns true 동기화 성공, false 동기화 실패
 */
export async function syncMeToServer(idToken: string | undefined | null): Promise<Boolean> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
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
 * 로그아웃
 */
export async function signOut(idToken: string | undefined | null, uid: string): Promise<SignOutResponse> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }

    const res = await apiClient.post(
        `${userApiUrl}/sign-out`, //url
        {                         //body
            uid: uid
        },
        {                         //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const data = (res.data) as SignOutResponse;
    return data
}

/**
 * 이메일 유효성 체크
 */
export async function checkValidEmail(email: string) {
    return apiClient.get(`${userApiUrl}/exists?email=${email}`);
}

/**
 * 회원 상태 변경
 */
export async function updateUserStatus(
    idToken: string | undefined | null,
    uid: string,
    userStatus: UserStatusType,
): Promise<ChangeUserStatusResponse> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }

    const res = await apiClient.patch(
        `${userApiUrl}/status`, //url
        {                       //body
            uid: uid,
            status: userStatus
        },
        {                       //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const data = (res.data) as ChangeUserStatusResponse;
    return data;
}

// /**
//  * 회원탈퇴(영구 삭제)
//  */
// export async function delelteUserByUid(idToken: string | undefined | null): Promise<Boolean> {
//     if (!idToken) {
//         throw new Error(`${tokenErrorMessage}`);
//     }

//     const res = await apiClient.delete(
//         `${userApiUrl}`, //url
//         {                //headers
//             headers: {
//                 Authorization: `Bearer ${idToken}`,
//             },
//         }
//     );

//     return Boolean(res.data.success);
// }

/**
 * 계정 삭제
 */
export async function deleteUser(
    idToken: string | undefined | null,
    uid: string
): Promise<DeleteUserResponse> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }

    const res = await apiClient.delete(
        `${userApiUrl}/${uid}`, //url
        {                       //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const data = (res.data) as DeleteUserResponse;
    return data;
}

/**
 * 회원 상태 변경
 */
export async function updateUserRole(
    idToken: string | undefined | null,
    uid: string,
    role: UserRole,
): Promise<UpdateUserRoleResponse> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);;
    }

    const res = await apiClient.patch(
        `${userApiUrl}/role`,   //url
        {                       //body
            uid: uid,
            role: role
        },
        {                       //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const data = (res.data) as UpdateUserRoleResponse;
    return data;
}



/**
 * 로그인 사용자 정보 로딩
 */
export async function getLoginUserInfo(
    idToken: string | undefined | null,
): Promise<UserInfo> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }

    const res = await apiClient.get(
        `${userApiUrl}/sign-in`,
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const rUser = (res.data.data) as RemoteUserInfo
    const user = converToUser(rUser)
    return user; 
}

/**
 * 비밀번호 초기화
 */
export async function resetPassword(
    idToken: string | undefined | null,
    uid: string,
): Promise<ResetPasswordResponse> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }

    const res = await apiClient.post(
        `${userApiUrl}/password-reset`, //url
        {                      //body
            uid: uid
        },
        {                      //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const data = (res.data) as ResetPasswordResponse;
    return data;
}
