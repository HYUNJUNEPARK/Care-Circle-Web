import { useState } from 'react';
import { useAuth } from "../../../../../features/auth/AuthProvider";
import { getSupplements as getSupplementsApi, searchSupplementsByEffectCode as searchSupplementsApi } from '../../../../../features/api/supplementApi';

import type { Supplement } from '../../../../../types/remote/Supplements';

/**
 * 영양제 리스트 가져오기
 */
function useSupplements() {
    const { user } = useAuth();
    const [supplements, setSupplements] = useState<Supplement[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * 영양제 리스트 가져오기
     */
    const getSupplements = async () => {
        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const supplements = await getSupplementsApi(idToken);
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
    const searchSupplementsByEffectCode = async (code: string) => {
        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const supplements = await searchSupplementsApi(idToken, code);
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