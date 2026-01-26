import { useState } from "react";
import { updateUserRole as updateUserRoleApi } from "../../../../../network/api/adminApis";
import { isUserRole } from "../../../../../types/UserRoleType";

/**
 * 회원 권한 수정
 */
function useUpdateRole() {
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setLoading] = useState<Boolean>(false);

    const updateUserRole = async (uid: string, role: string) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        if (!isUserRole(role)) throw new Error('Invalid User Role');
        
        try {
            setLoading(true);
            const res = await updateUserRoleApi(uid, role);
            const rUid = res?.uid;
            const rRole = res?.role;
            const updateAt = res?.updatedAt;
            if (!res || !rUid || !updateAt || !rRole) {
                throw new Error("Response data is invalid.");
            }

            return res;
        } catch (error) {
            console.error('updateUserRole', error);
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        updateUserRole,
        isLoading,
        error,
    }
}

export default useUpdateRole;