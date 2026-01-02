import { useState } from 'react';
import type { UserInfo } from '../../../../../types/UserInfo'
import { useAuth } from "../../../../../features/auth/AuthProvider";
import { getAllUsers } from '../../../../../features/api/userApi';

/**
 * 사용자 리스트 가져오기
 */
function useAllUsers() {
    const { user } = useAuth();
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchAllUsers = async () => {
        try {
            setLoading(true);

            const idToken = await user?.getIdToken();

            const users = await getAllUsers(idToken);

            setUsers(users);
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }
    
    return {
        fetchAllUsers,
        setUsers,
        users,
        isLoading,
        error
    }

}

export default useAllUsers;