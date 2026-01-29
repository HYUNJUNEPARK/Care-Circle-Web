import privateAxios from '../axios/privateAxios';
import type { EffectCode, EffectCodeResponse } from '../../types/remote/EffectCodes';
import type { 
    SupplementsResponse, SearchSupplementsByKeywordResponse, SearchSupplementsParams, SupplementsWithMyFlagResponse, UpdateHealthItemInListResponse,
    UpdateHealthItemInListResult
 } from '../../types/remote/Supplements';
import type { PaginationParams } from '../../types/remote/Pagination';

const healthItemApiUrl = `/api/health-items`

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
        `${healthItemApiUrl}?${query.toString()}`,
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
        `${healthItemApiUrl}/user?${query.toString()}`,
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
        `${healthItemApiUrl}/search?keyword=${keyword}&page=${page}&limit=${limit}`,
    );
    const resData = res.data as SearchSupplementsByKeywordResponse;
    return resData;
}

/**
 * 전체 영양제 코드 리스트 가져오기
 */
export async function getEffectCodes(): Promise<EffectCode[]> {
    const res = await privateAxios.get(
        `${healthItemApiUrl}/codes/effect`,
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
 * @param id 추가할 영양제 ID
 */
export async function addHealthItemInList(id: number): Promise<UpdateHealthItemInListResult> {
    const res = await privateAxios.post(
        `${healthItemApiUrl}/user`,
        {
            supplementId: id
        }
    );
    const resData = res.data as UpdateHealthItemInListResponse;
    const result = resData.data;   
    return result;
}

/**
 * 사용자 영양제 리스트에서 아이템 제거
 */
export async function removeHealthItemFromList(id: number): Promise<UpdateHealthItemInListResult> {
    const res = await privateAxios.delete(
        `${healthItemApiUrl}/user/${id}`
    );
    const resData = res.data as UpdateHealthItemInListResponse;
    const result = resData.data;
    return result;
}  

/**
 * 전체 영양제 리스트 가져오기 (내 리스트 포함 여부 플래그 포함)
 * isInMyList 필드가 포함된 응답 반환
 */
export async function getHealthItemsWithInListFlag(
    params: PaginationParams
): Promise<SupplementsWithMyFlagResponse> {
    const { page = 1, limit = 20 } = params;

    const query = new URLSearchParams();
    query.append("page", String(page));
    query.append("limit", String(limit));

    const res = await privateAxios.get(
        `${healthItemApiUrl}/with-my-flag?${query.toString()}`,
    );
    const resData = res.data as SupplementsWithMyFlagResponse;
    return resData;
}