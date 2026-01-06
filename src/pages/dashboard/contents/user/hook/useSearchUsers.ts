import { useState } from 'react';
import type { UserInfo } from '../../../../../types/UserInfo'
import { useAuth } from "../../../../../features/auth/AuthProvider";
import { searchUsersByEmailOrUid } from '../../../../../features/api/userApi';

/**
 * 사용자 리스트 가져오기
 */
function useSearchUsers() {
    const { user } = useAuth();
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const searchUsers = async (keyword: string) => {
        try {
            setLoading(true);

            const idToken = await user?.getIdToken();

            const users = await searchUsersByEmailOrUid(idToken, keyword);

            setUsers(users);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }
    
    return {
        searchUsers,
        setUsers,
        users,
        isLoading,
        error
    }

}

export default useSearchUsers;