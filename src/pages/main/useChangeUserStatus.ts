import { useState } from "react";
import { changeStatus } from "../../features/api/authApi";
import type { UserStatusType } from "../../types/UserStatusType";
import { useAuth } from "../../features/auth/AuthProvider";
import useSignOut from './useSignOut';

/**
 * 회원 상태 수정
 */
function useChangeUserStatus() {
    const { user } = useAuth();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);
    const { userSignOut, } = useSignOut();

    const changeUserStatus = async (status: UserStatusType) => {
        try {
            setLoading(true);

            const idToken = await user?.getIdToken();

            const isSuccess = await changeStatus(idToken, status);

            if (isSuccess) {
                userSignOut()
            }
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false); 
        }
    }

    return {
        changeUserStatus,
        isLoading,
        error,
    }
}

export default useChangeUserStatus;