import privateAxios from '../axios/privateAxios';
import type {
    SupplementsResponse, SearchSupplementsParams,
    UpdateSupplementStatusResponse, SupplementStatus
} from '../../types/remote/Supplements';
import type SignOutResponse from '../../types/remote/SignOutResponse';
import type { UserStatusType } from '../../types/UserStatusType';
import type ChangeUserStatusResponse from '../../types/remote/ChangeStatusResponse';
import type { UserInfo } from '../../types/local/UserInfo';
import type { RemoteUserInfo } from '../../types/remote/RemoteUserInfo';
import type ResetPasswordResponse from '../../types/remote/ResetPasswordResponse';
import type UpdateUserRoleResponse from '../../types/remote/UpdateUserRoleResponse';
import type DeleteUserResponse from '../../types/remote/DeleteUserStatusResponse';
import type { UserRole } from '../../types/UserRoleType';
import { converToUsers } from '../../utils/formatter';

/**
 * 관리자 API 기본 경로
 */

const adminApiUrl = `/api/admin`;

/**
 * 전체 영양제 리스트 가져오기(관리자용)
 */
export async function getAdminSupplements(
    params: SearchSupplementsParams
): Promise<SupplementsResponse> {
    const { effectCode, page = 1, limit = 50 } = params;

    const query = new URLSearchParams();
    if (effectCode) query.append("effectCode", effectCode);

    query.append("page", String(page));
    query.append("limit", String(limit));

    const res = await privateAxios.get(
        `${adminApiUrl}/health-items?${query.toString()}`,
    );
    const resData = res.data as SupplementsResponse;
    return resData;
}

/**
 * 영양제 상태 변경 (ACTIVE <-> INACTIVE) (관리자용)
 */
export async function updateSupplementStatus(
    supplementCode: string,
    status: 'ACTIVE' | 'INACTIVE'
): Promise<SupplementStatus> {
    const res = await privateAxios.patch(
        `${adminApiUrl}/health-items/${supplementCode}/status`,
        {
            status
        },
        {}
    );
    const resData = res.data as UpdateSupplementStatusResponse
    const updatedStatus = resData.data;
    return updatedStatus;
}

/**
 * 전체 사용자 조회(관리자용)
 */
export async function getAllUsers(): Promise<UserInfo[]> {
    const res = await privateAxios.get(
        `${adminApiUrl}/users`,
    );

    const remoteUsers = (res.data.data) as RemoteUserInfo[];
    const users = converToUsers(remoteUsers);
    return users;
}

/**
 * Email or Uid 로 사용자 검색(관리자용)
 */
export async function searchUsers(keyword: string): Promise<UserInfo[]> {
    const res = await privateAxios.get(
        `${adminApiUrl}/users/search?keyword=${keyword}`,
    );
    const remoteUsers = (res.data.data) as RemoteUserInfo[];
    const users = converToUsers(remoteUsers);
    return users;
}

/**
 * 로그아웃(관리자용)
 */
export async function adminSignOut(uid: string): Promise<SignOutResponse> {
    const res = await privateAxios.post(
        `${adminApiUrl}/users/sign-out`,
        {                     
            uid: uid
        },
    );
    const data = (res.data) as SignOutResponse;
    return data;
}

/**
 * 회원 상태 변경(관리자용)
 */
export async function updateUserStatus(
    uid: string,
    userStatus: UserStatusType,
): Promise<ChangeUserStatusResponse> {
    const res = await privateAxios.patch(
        `${adminApiUrl}/users/status`,
        {                     
            uid: uid,
            status: userStatus
        },
        {}
    );
    const data = (res.data) as ChangeUserStatusResponse;
    return data;
}

/**
 * 비밀번호 초기화(관리자용)
 */
export async function resetPassword(uid: string): Promise<ResetPasswordResponse> {
    const res = await privateAxios.post(
        `${adminApiUrl}/users/password-reset`, 
        {                    
            uid: uid
        },
    );
    const data = (res.data) as ResetPasswordResponse;
    return data;
}

/**
 * 회원 권한 변경(관리자용)
 */
export async function updateUserRole(
    uid: string,
    role: UserRole,
): Promise<UpdateUserRoleResponse> {
    const res = await privateAxios.patch(
        `${adminApiUrl}/users/role`,
        {
            uid: uid,
            role: role
        },
    );
    const data = (res.data) as UpdateUserRoleResponse;
    return data;
}

/**
 * 계정 삭제(관리자용)
 */
export async function deleteUser(uid: string): Promise<DeleteUserResponse> {
    const res = await privateAxios.delete(
        `${adminApiUrl}/users/${uid}`,
    );
    const data = (res.data) as DeleteUserResponse;
    return data;
}