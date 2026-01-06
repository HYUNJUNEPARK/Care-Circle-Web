import { useState } from "react";
import { updateUserStatus as updateUserStatusApi } from "../../../../../features/api/userApi";
import type { UserStatusType } from "../../../../../types/UserStatusType";
import { useAuth } from "../../../../../features/auth/AuthProvider";

/**
 * 회원 상태 수정
 */
function useUpdateUserStatus() {
    const { user } = useAuth();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const updateUserStatus = async (uid: string, status: UserStatusType) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const res = await updateUserStatusApi(idToken, uid, status);
            const rUid = res?.uid;
            const newStatus = res?.status;
            const updateAt = res?.timeStamp;
            if (!res || !rUid || !newStatus || !updateAt) {
                throw new Error("response data is invalid");
            }

            return res
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        updateUserStatus,
        isLoading,
        error,
    }
}

export default useUpdateUserStatus;