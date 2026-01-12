import { apiClient } from './apiClient';
import type Supplements from '../../types/Supplements';
import type EffectCode from '../../types/remote/EffectCode';
import type EffectCodesResponse from '../../types/remote/EffectCodesResponse';

const supplementApiUrl = `/api/supplements`

const tokenErrorMessage = 'IdToken is null.';

/**
 * 전체 영양제 리스트 가져오기
 */
export async function getSupplements(
    idToken: string | undefined | null
): Promise<Supplements[]> {
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

    const data = res.data.data;
    const supplements: Supplements[] = data.map((item: any) => ({
        code: item.code,
        name: item.name,
        imgUrl: item.img_url,
        description: item.description,
        effects: item.effects
    }));

    return supplements;
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

    const resData = res.data as EffectCodesResponse;
    const supplements: EffectCode[] = resData.data.map((item: EffectCode) => ({
        code: item.code,
        name: item.name,
    }));

    return supplements;
}