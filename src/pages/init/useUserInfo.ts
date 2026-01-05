import { useState } from 'react';
import type { UserInfo } from '../../types/UserInfo'
import { useAuth } from "../../features/auth/AuthProvider";
import { getLoginUserInfo } from '../../features/api/userApi';

/**
 * 로그인 사용자 정보 로드
 */
function useUserInfo() {
    const { user } = useAuth();
    const [onlineUser, setOnlineUser] = useState<UserInfo>();
    const [isLoading, setLoading] = useState(false);

    const fetchUserInfo = async () => {
        try {
            setLoading(true);

            const idToken = await user?.getIdToken();

            const userInfo = await getLoginUserInfo(idToken);

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