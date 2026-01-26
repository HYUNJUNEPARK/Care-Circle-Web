import { useState } from 'react';
import type { UserInfo } from '../../../../../types/local/UserInfo'
import { getAllUsers as getAllUsersApi } from '../../../../../network/api/adminApis';

/**
 * 사용자 리스트 가져오기
 */
function useAllUsers() {
    const [users, setUsers] = useState<UserInfo[]>([]);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchAllUsers = async () => {
        try {
            setLoading(true);

            const users = await getAllUsersApi();

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