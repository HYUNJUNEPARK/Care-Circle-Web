import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../network/auth/firebaseAuth"
import { syncMeToServer } from '../../network/api/userApi';
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

            await createUserWithEmailAndPassword(firebaseAuth, email, password);

            await syncMeToServer();

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