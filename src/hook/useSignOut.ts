import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../features/auth/authClient";

/**
 * 로그아웃
 */
function useSignOut() {
    const [error, setError] = useState<Error | null>(null);

    const userSignOut = async () => {
        try {
            // FB 로그아웃
            await signOut(auth)
            
        } catch (error) {
            setError(error as Error);
        }
    }

    return {
        userSignOut,
        error,
    }
}

export default useSignOut;