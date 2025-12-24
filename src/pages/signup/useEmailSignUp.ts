import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../features/auth/authClient"

function useEmailSignUp() {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const emailSignUp = async (email: string, password: string) => {
        try {
            setLoading(true);
            //계정 생성
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            //계정 정보 리턴
            return userCredential;
        } catch (error) {
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

export default useEmailSignUp;