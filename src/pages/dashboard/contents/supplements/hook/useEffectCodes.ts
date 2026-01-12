import { useState } from 'react';
import { useAuth } from "../../../../../features/auth/AuthProvider";
import { getEffectCodes as getEffectCodesApi } from '../../../../../features/api/supplementApi';
import { convToUiData, type EffectCodeForUi } from '../../../../../types/local/EffectCodes';

/**
 * 영양제 코드 리스트 가져오기
 */
function useEffectCodes() {
    const { user } = useAuth();
    const [effectCodes, setEffectCodes] = useState<EffectCodeForUi[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const getEffectCodes = async () => {
        try {
            setLoading(true);
            const idToken = await user?.getIdToken();

            const allOpts: EffectCodeForUi = {
                code: 'ALL',
                name: '전체',
                isClicked: true,
            };
            const effectCodes = await getEffectCodesApi(idToken);
            const effectCodesForUi = effectCodes.map(convToUiData);
            const effectCodeOpts = [allOpts, ...effectCodesForUi];
            setEffectCodes(effectCodeOpts);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    const updateEffectCodeClickState = (code: string) => {
        const updatedCodes = effectCodes.map(ec => ({
            ...ec,
            isClicked: ec.code === code
        }));
        setEffectCodes(updatedCodes);
    };

    return {
        getEffectCodes,
        updateEffectCodeClickState,
        effectCodes,
        isLoading,
        error
    };
}

export default useEffectCodes;