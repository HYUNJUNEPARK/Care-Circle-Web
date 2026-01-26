import privateAxios from '../axios/privateAxios';
import type {
    SupplementsResponse, SearchSupplementsParams,
} from '../../types/remote/Supplements';

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