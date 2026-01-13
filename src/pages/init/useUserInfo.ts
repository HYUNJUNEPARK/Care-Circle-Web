import { useState } from 'react';
import type { UserInfo } from '../../types/local/UserInfo'
import { getLoginUserInfo } from '../../features/api/userApi';

/**
 * 로그인 사용자 정보 로드
 */
function useUserInfo() {
    const [onlineUser, setOnlineUser] = useState<UserInfo>();
    const [isLoading, setLoading] = useState(false);

    const fetchUserInfo = async () => {
        try {
            setLoading(true);
            const userInfo = await getLoginUserInfo();
            return userInfo;
        } catch (error) {
            console.error('useUserInfo()', error)
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        fetchUserInfo,
        setOnlineUser,
        onlineUser,
        isLoading,
    }
}

export default useUserInfo;