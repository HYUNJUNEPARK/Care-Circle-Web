import { useState } from "react";
import { changeStatus } from "../../../../../features/api/userApi";
import type { UserStatusType } from "../../../../../types/UserStatusType";
import { useAuth } from "../../../../../features/auth/AuthProvider";

/**
 * 회원 상태 수정
 */
function useChangeUserStatus() {
    const { user } = useAuth();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const changeUserStatus = async (uid: string, status: UserStatusType) => {
        if (isLoading) {
            console.info('This request is already in progress.')
            return;
        }

        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const res = await changeStatus(idToken, uid, status);
            return res
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