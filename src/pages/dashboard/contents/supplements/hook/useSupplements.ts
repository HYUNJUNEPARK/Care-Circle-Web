import { useState } from 'react';
import { getSupplements as getSupplementsApi, searchSupplementsByEffectCode as searchSupplementsApi } from '../../../../../features/api/supplementApi';
import type { Supplement } from '../../../../../types/remote/Supplements';

/**
 * 영양제 리스트 가져오기
 */
function useSupplements() {
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * 영양제 리스트 가져오기
     */
    const getSupplements = async (
        page: number,
        limit: number = 20
    ) => {
        try {
            setLoading(true);
            const supplements = await getSupplementsApi(page, limit);
            setSupplements(supplements);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * Effect 코드에 해당하는 영양제 검색
     */
    const searchSupplementsByEffectCode = async (
        code: string,
        page: number,
        limit: number = 20
    ) => {
        try {
            setLoading(true);
            const supplements = await searchSupplementsApi(code, page, limit);
            setSupplements(supplements);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    return {
        getSupplements,
        searchSupplementsByEffectCode,
        supplements,
        isLoading,
        error
    }

}

export default useSupplements;