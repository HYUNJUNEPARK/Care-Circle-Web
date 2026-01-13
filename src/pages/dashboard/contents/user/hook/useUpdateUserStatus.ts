import { useState } from "react";
import { updateUserStatus as updateUserStatusApi } from "../../../../../features/api/userApi";
import type { UserStatusType } from "../../../../../types/UserStatusType";

/**
 * 회원 상태 수정
 */
function useUpdateUserStatus() {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const updateUserStatus = async (uid: string, status: UserStatusType) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            const res = await updateUserStatusApi(uid, status);
            const rUid = res?.uid;
            const newStatus = res?.status;
            const updatedAt = res?.updatedAt;
            if (!res || !rUid || !newStatus || !updatedAt) {
                throw new Error("Response data is invalid.");
            }

            return res;
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