import { useState } from "react";
import { deleteUser as deleteUserApi } from "../../../../../network/api/userApis";

/**
 * 회원 상태 수정
 */
function useDeleteUser() {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const deleteUser = async (uid: string) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            const res = await deleteUserApi(uid);
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