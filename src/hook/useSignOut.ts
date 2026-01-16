import { useState } from 'react';
import { signOut as signOutApi } from '../network/api/userApi';
import { firebaseAuth } from "../network/auth/firebaseAuth";
import { signOut as authSignOut } from "firebase/auth";

/**
 * 로그아웃
 */
function useSignOut() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

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
            const res = await signOutApi(uid);
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
            const uid = firebaseAuth.currentUser?.uid
            if (!uid) {
                setError(new Error('Uid is null'));
                return;
            }

            await signOutApi(uid);
            await authSignOut(firebaseAuth)
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
            await authSignOut(firebaseAuth)
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