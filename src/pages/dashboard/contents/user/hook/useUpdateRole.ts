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

        if (!isUserRole(role)) {
            throw Error('Not UserRole');
        }

        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const res = await updateUserRoleApi(idToken, uid, role);
            const rUid = res?.uid;
            const rRole = res?.role;
            const updateAt = res?.timeStamp;
            if (!res || !rUid || !updateAt || !rRole) {
                setError(Error("response data is invalid"));
                return;
            }

            return res;
        } catch (error) {
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