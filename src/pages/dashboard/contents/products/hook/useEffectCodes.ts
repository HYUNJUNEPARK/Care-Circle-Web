import { useState } from 'react';
import { useAuth } from "../../../../../features/auth/AuthProvider";
import { getEffectCodes as getEffectCodesApi } from '../../../../../features/api/supplementApi';
import type EffectCode from '../../../../../types/remote/EffectCode';

/**
 * 영양제 코드 리스트 가져오기
 */
function useEffectCodes() {
    const { user } = useAuth();
    const [effectCodes, setEffectCodes] = useState<EffectCode[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getEffectCodes = async () => {
        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const effectCodes = await getEffectCodesApi(idToken);
            setEffectCodes(effectCodes);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    return {
        getEffectCodes,
        effectCodes,
        isLoading,
        error
    }

}

export default useEffectCodes;