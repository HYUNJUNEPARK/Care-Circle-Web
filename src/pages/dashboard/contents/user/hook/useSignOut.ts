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
        try {
            setLoading(true);

            const idToken = await user?.getIdToken();

            await signOut(idToken, uid)
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