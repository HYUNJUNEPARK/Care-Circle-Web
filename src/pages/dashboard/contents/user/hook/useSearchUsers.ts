import { useState } from 'react';
import type { UserInfo } from '../../../../../types/local/UserInfo'
import { searchUsers as SearchUsersApi } from '../../../../../network/api/adminApis';

/**
 * 사용자 검색 훅
 */
function useSearchUsers() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const searchUsers = async (keyword: string): Promise<UserInfo[]> => {
        try {
            setLoading(true);
            const users = await SearchUsersApi(keyword);
            return users;
        } catch (error) {
            setError(error as Error)
            return [];
        } finally {
            setLoading(false);
        }
    }

    return {
        searchUsers,
        isLoading,
        error
    }

}

export default useSearchUsers;