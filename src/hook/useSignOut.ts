import { useState } from 'react';
import { adminSignOut as adminSignOutApi } from '../network/api/adminApis';
import { signOut as signOutApi } from '../network/api/userApis';
import { firebaseAuth } from "../network/auth/firebaseAuth";
import { signOut as firebaseAuthSignOut } from "firebase/auth";

/**
 * 로그아웃
 */
function useSignOut() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    /**
     * uid 에 해당하는 회원을 로그아웃 시킨다.(관리자용)
     * cf. 관리자만 사용 가능
     */
    const signOutByUid = async (uid: string) => {
        if (isLoading) {
            console.info('This request is already in progress.');
            return;
        }

        try {
            setLoading(true);
            const res = await adminSignOutApi(uid);
            const resData = res?.data;
            if (!resData) {
                throw new Error("Response is invalid.");
            }
            return resData;
        } catch (error) {
            setError(error as Error)
        } finally {
            setLoading(false);
        }
    }

    /**
     * 로그인 중인 사용자를 로그아웃 시킨다.(일반 사용자용)
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

            await signOutApi();
            
            await firebaseAuthSignOut(firebaseAuth)
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
            await firebaseAuthSignOut(firebaseAuth)
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