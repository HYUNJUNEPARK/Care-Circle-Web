import { useState } from "react";
import { resetPassword as resetPasswordApi } from "../../../../../features/api/userApi";
import { useAuth } from "../../../../../features/auth/AuthProvider";

/**
 * 비밀번호 초기화
 */
function useResetPassword() {
    const { user } = useAuth();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const resetPassword = async (uid: string) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const res = await resetPasswordApi(idToken, uid);
            const rUid = res?.uid;
            const passwordResetAt = res?.passwordResetAt;
            const updatedAt = res?.updatedAt;
            const logoutAt = res?.logoutAt;
            if (!res || !rUid || !passwordResetAt || !updatedAt || !logoutAt) {
                throw new Error("Response is invalid");
            }

            return res;
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        resetPassword,
        isLoading,
        error,
    }
}

export default useResetPassword;