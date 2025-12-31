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
        try {
            setLoading(true);

            const idToken = await user?.getIdToken();

            await changeStatus(idToken, uid, status);

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