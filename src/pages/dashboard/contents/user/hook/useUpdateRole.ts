import { useState } from "react";
import { updateUserRole as updateUserRoleApi } from "../../../../../features/api/userApi";
import { isUserRole } from "../../../../../types/UserRoleType";
import { useAuth } from "../../../../../features/auth/AuthProvider";

/**
 * 회원 권한 수정
 */
function useUpdateRole() {
    const { user } = useAuth();
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
            const idToken = await user?.getIdToken();
            const res = await updateUserRoleApi(idToken, uid, role);
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