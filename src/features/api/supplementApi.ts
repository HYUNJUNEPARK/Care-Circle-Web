import { apiClient } from './apiClient';
import type { SearchSupplementsResponse, Supplement, SupplementsResponse } from '../../types/remote/Supplements';
import type { EffectCode, EffectCodeResponse } from '../../types/remote/EffectCodes';

const supplementApiUrl = `/api/supplements`

const tokenErrorMessage = 'IdToken is null.';

/**
 * 전체 영양제 리스트 가져오기
 */
export async function getSupplements(
    idToken: string | undefined | null
): Promise<Supplement[]> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }
    const res = await apiClient.get(
        `${supplementApiUrl}`, //url
        {                      //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );
    const resData = res.data as SupplementsResponse;
    return resData.data;
}

/**
 * Effect 코드에 해당하는 영양제 검색
 */
export async function searchSupplementsByEffectCode(
    idToken: string | undefined | null,
    effectCode: string
): Promise<Supplement[]> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }
    const res = await apiClient.get(
        `${supplementApiUrl}?effectCode=${effectCode}`, //url
        {                                               //headers
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );
    const resData = res.data as SearchSupplementsResponse;
    return resData.data;
}


/**
 * 전체 영양제 코드 리스트 가져오기
 */
export async function getEffectCodes(
    idToken: string | undefined | null
): Promise<EffectCode[]> {
    if (!idToken) {
        throw new Error(`${tokenErrorMessage}`);
    }

    const res = await apiClient.get(
        `${supplementApiUrl}/codes/effect`,
        {
            headers: {
                Authorization: `Bearer ${idToken}`,
            },
        }
    );

    const resData = res.data as EffectCodeResponse;
    const supplements: EffectCode[] = resData.data.map((item: EffectCode) => ({
        code: item.code,
        name: item.name,
    }));

    return supplements;
}