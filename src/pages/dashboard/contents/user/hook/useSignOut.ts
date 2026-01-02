import { useState } from 'react';
import { useAuth } from "../../../../../features/auth/AuthProvider";
import { signOut } from '../../../../../features/api/userApi';

/**
 * 로그아웃
 */
function useSignOut() {
    const { user } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const signOutByUid = async (uid: string) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const res = await signOut(idToken, uid);
            return res;
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    return {
        signOutByUid,
        isLoading,
        error
    }

}

export default useSignOut;