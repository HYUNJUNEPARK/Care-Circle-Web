import { useState } from 'react';
import { useAuth } from "../features/auth/AuthProvider";
import { signOut as signOutApi } from '../features/api/userApi';
import { auth } from "../features/auth/authClient";
import { signOut as authSignOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { PATH } from "../constants/paths";

/**
 * 로그아웃
 */
function useSignOut() {
    const { user } = useAuth();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    //const navigate = useNavigate();

    /**
     * uid 에 해당하는 회원을 로그아웃 시킨다.
     * cf. 관리자만 사용 가능
     */
    const signOutByUid = async (uid: string) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            const idToken = await user?.getIdToken();
            const res = await signOutApi(idToken, uid);
            const rUid = res?.uid;
            const logoutAt = res?.logoutAt;
            const updatedAt = res?.updateAt;
            if (!res || !rUid || !logoutAt || !updatedAt) {
                throw new Error("Response is invalid.");
            }

            return res;
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * 로그인 중인 사용자를 로그아웃 시킨다.
     */
    const signOut = async () => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            //온라인 로그아웃
            const uid = auth.currentUser?.uid
            if (!uid) {
                setError(new Error('Uid is null'));
                return;
            }

            const idToken = await user?.getIdToken();
            await signOutApi(idToken, uid);

            await authSignOut(auth)

            //await signOutCache();
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * firebase auth sign-out
     */
    const signOutCache = async () => {
        try {
            // FB 로그아웃
            setLoading(true);
            await authSignOut(auth)
        } catch (error) {
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        signOutByUid,
        signOut,
        signOutCache,
        isLoading,
        error
    }

}

export default useSignOut;