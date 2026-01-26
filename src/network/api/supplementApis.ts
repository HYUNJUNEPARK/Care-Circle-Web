import privateAxios from '../axios/privateAxios';
import type { EffectCode, EffectCodeResponse } from '../../types/remote/EffectCodes';
import type {
    SupplementsResponse,
    SearchSupplementsByKeywordResponse, SearchSupplementsParams,
    UpdateSupplementStatusResponse, SupplementStatus
} from '../../types/remote/Supplements';

const supplementApiUrl = `/api/health-items`

/**
 * 전체 영양제 리스트 가져오기(일반 회원용)
 */
export async function getSupplements(
    params: SearchSupplementsParams
): Promise<SupplementsResponse> {
    const { effectCode, page = 1, limit = 20 } = params;

    const query = new URLSearchParams();
    if (effectCode) query.append("effectCode", effectCode);

    query.append("page", String(page));
    query.append("limit", String(limit));

    const res = await privateAxios.get(
        `${supplementApiUrl}?${query.toString()}`,
    );
    const resData = res.data as SupplementsResponse;
    return resData;
}

/**
 * 내 영양제 리스트 가져오기
 */
export async function getUserSupplements() {
    const res = await privateAxios.get(
        `${supplementApiUrl}/user`,
    );
    const resData = res.data
    const data = resData.data;
    return data;
}

// /**
//  * 전체 영양제 리스트 가져오기(관리자용)
//  */
// export async function getAdminSupplements(
//     params: SearchSupplementsParams
// ): Promise<SupplementsResponse> {
//     const { effectCode, page = 1, limit = 50 } = params;

//     const query = new URLSearchParams();
//     if (effectCode) query.append("effectCode", effectCode);

//     query.append("page", String(page));
//     query.append("limit", String(limit));

//     const res = await privateAxios.get(
//         `${supplementApiUrl}/admin?${query.toString()}`,
//     );
//     const resData = res.data as SupplementsResponse;
//     return resData;
// }

/**
 * 키워드(영양제 이름, 영양제 코드로) 영양제 검색
 */
export async function searchSupplementsByKeyword(
    keyword: string,
    page: number,
    limit: number
): Promise<SearchSupplementsByKeywordResponse> {
    const res = await privateAxios.get(
        `${supplementApiUrl}/search?keyword=${keyword}&page=${page}&limit=${limit}`,
    );
    const resData = res.data as SearchSupplementsByKeywordResponse;
    return resData;
}

/**
 * 전체 영양제 코드 리스트 가져오기
 */
export async function getEffectCodes(): Promise<EffectCode[]> {
    const res = await privateAxios.get(
        `${supplementApiUrl}/codes/effect`,
    );

    const resData = res.data as EffectCodeResponse;
    const supplements: EffectCode[] = resData.data.map((item: EffectCode) => ({
        code: item.code,
        name: item.name,
    }));

    return supplements;
}

/**
 * 영양제 상태 변경 (ACTIVE <-> INACTIVE)
 */
export async function updateSupplementStatus(
    supplementCode: string,
    status: 'ACTIVE' | 'INACTIVE'
): Promise<SupplementStatus> {
    const res = await privateAxios.patch(
        `${supplementApiUrl}/${supplementCode}/status`,
        {
            status
        },
        {}
    );
    const resData = res.data as UpdateSupplementStatusResponse
    const updatedStatus = resData.data;
    return updatedStatus;
}