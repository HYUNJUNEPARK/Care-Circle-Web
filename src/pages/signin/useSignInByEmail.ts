import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth } from "../../network/auth/firebaseAuth";

function useSignInByEmail() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const signInByEmail = async (email: string, password: string) => {
        try {
            setLoading(true);

            //FB 서버 로그인
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch (error) {
            console.error('useSignInByEmail', error);
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    }

    return {
        signInByEmail,
        isLoading,
        error,
    }
}

export default useSignInByEmail;