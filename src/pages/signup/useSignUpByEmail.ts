import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../features/auth/authClient"
import { syncMeToServer } from '../../features/api/userApi';
import { useNavigate } from "react-router-dom";
import { PATH } from '../../constants/paths';

/**
 * 회원 가입
 */
function useSignUpByEmail() {
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const emailSignUp = async (email: string, password: string) => {
        try {
            setLoading(true);
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            const idToken = await userCredential?.user?.getIdToken();

            await syncMeToServer(idToken);

            navigate(PATH.ROOT, { replace: true });
        } catch (error) {
            console.error('useSignUpByEmail()', error);
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        emailSignUp,
        isLoading,
        error,
    }
}

export default useSignUpByEmail;