import privateAxios from '../axios/privateAxios';
import type {
    SupplementsResponse, SearchSupplementsParams,
} from '../../types/remote/Supplements';
import type SignOutResponse from '../../types/remote/SignOutResponse';
import type { UserStatusType } from '../../types/UserStatusType';
import type ChangeUserStatusResponse from '../../types/remote/ChangeStatusResponse';

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
 * 회원 상태 변경
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