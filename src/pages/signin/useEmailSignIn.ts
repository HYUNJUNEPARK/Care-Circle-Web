import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../features/auth/authClient";
import { syncMeToServer } from '../../features/api/authApi';

function useEmailSignIn() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const emailSignIn = async (email: string, password: string) => {
        try {
            setLoading(true);

            // FB 서버 로그인
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // 백엔드에서 토큰 겁증 및 회원 정보 동기화
            const idToken = await userCredential.user.getIdToken();
            const isSuccess = await syncMeToServer(idToken);

            if (!isSuccess) {
                setError(Error("서버 동기화 실패"));
                return false;
            }

            // 서버 동기화 성공
            return true
        } catch (e) {
            setError(e as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        emailSignIn,
        isLoading,
        error,
    }
}

export default useEmailSignIn;