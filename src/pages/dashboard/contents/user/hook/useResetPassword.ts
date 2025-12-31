import { useState } from "react";
import { resetPassword } from "../../../../../features/api/userApi";
import { useAuth } from "../../../../../features/auth/AuthProvider";

/**
 * 비밀번호 초기화
 */
function useResetPassword() {
    const { user } = useAuth();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const reset = async (uid: string) => {
        try {
            setLoading(true);

            const idToken = await user?.getIdToken();

            await resetPassword(idToken, uid);
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        reset,
        isLoading,
        error,
    }
}

export default useResetPassword;