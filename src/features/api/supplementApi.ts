import { authAxios } from '../axios/authAxios';
import type { SearchSupplementsResponse, Supplement, SupplementsResponse } from '../../types/remote/Supplements';
import type { EffectCode, EffectCodeResponse } from '../../types/remote/EffectCodes';

const supplementApiUrl = `/api/supplements`

/**
 * 전체 영양제 리스트 가져오기
 */
export async function getSupplements(): Promise<Supplement[]> {
    const res = await authAxios.get(
        `${supplementApiUrl}`,
    );
    const resData = res.data as SupplementsResponse;
    return resData.data;
}

/**
 * Effect 코드에 해당하는 영양제 검색
 */
export async function searchSupplementsByEffectCode(effectCode: string): Promise<Supplement[]> {
    const res = await authAxios.get(
        `${supplementApiUrl}?effectCode=${effectCode}`,
    );
    const resData = res.data as SearchSupplementsResponse;
    return resData.data;
}


/**
 * 전체 영양제 코드 리스트 가져오기
 */
export async function getEffectCodes(): Promise<EffectCode[]> {
    const res = await authAxios.get(
        `${supplementApiUrl}/codes/effect`,
    );

    const resData = res.data as EffectCodeResponse;
    const supplements: EffectCode[] = resData.data.map((item: EffectCode) => ({
        code: item.code,
        name: item.name,
    }));

    return supplements;
}