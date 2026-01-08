import { useState } from "react";
import { useAuth } from "../../../../../features/auth/AuthProvider";
import { deleteUser as deleteUserApi } from "../../../../../features/api/userApi";

/**
 * 회원 상태 수정
 */
function useDeleteUser() {
    const { user } = useAuth();
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const deleteUser = async (uid: string) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const res = await deleteUserApi(idToken, uid);
            const rUid = res?.uid;
            const status = res?.status;
            const updatedAt = res?.updatedAt;
            const deletedAt = res?.deletedAt;
            if (!res || !rUid || !status || !updatedAt || !deletedAt) {
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
        deleteUser,
        isLoading,
        error,
    }
}

export default useDeleteUser;