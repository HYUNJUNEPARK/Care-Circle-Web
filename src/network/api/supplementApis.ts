import privateAxios from '../axios/privateAxios';
import type { EffectCode, EffectCodeResponse } from '../../types/remote/EffectCodes';
import type { SupplementsResponse, SearchSupplementsByKeywordResponse, SearchSupplementsParams } from '../../types/remote/Supplements';
import type { PaginationParams } from '../../types/remote/Pagination';

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
export async function getUserSupplements(
    params: PaginationParams
): Promise<SupplementsResponse>  {
    const { page = 1, limit = 20 } = params;
    const query = new URLSearchParams();
    query.append("page", String(page));
    query.append("limit", String(limit));

    const res = await privateAxios.get(
        `${supplementApiUrl}/user?${query.toString()}`,
    );

    const resData = res.data as SupplementsResponse;

    
    return resData;
}

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
 * 사용자 영양제 리스트에 아이템 추가
 * @param supplementId 추가할 영양제 ID
 */
export async function addUserHealthItem(supplementId: number) {
    const res = await privateAxios.post(
        `${supplementApiUrl}/user`,
        {
            supplementId
        }
    );
    return res.data;
}