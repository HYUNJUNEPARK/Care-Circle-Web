import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../features/auth/authClient";
import { useNavigate } from "react-router-dom";
import { PATH } from '../../constants/paths';

function useEmailSignIn() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const emailSignIn = async (email: string, password: string) => {
        try {
            setLoading(true);

            //FB 서버 로그인
            await signInWithEmailAndPassword(auth, email, password);

            navigate(PATH.ROOT, { replace: true });
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