import { useState } from 'react';
import { useAuth } from "../../../../../features/auth/AuthProvider";
import { getSupplements as getSupplementsApi } from '../../../../../features/api/supplementApi';
import type Supplements from '../../../../../types/Supplements';

/**
 * 영양제 리스트 가져오기
 */
function useSupplements() {
    const { user } = useAuth();
    const [supplements, setSupplements] = useState<Supplements[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

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

    return {
        getSupplements,
        supplements,
        isLoading,
        error
    }

}

export default useSupplements;