import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../features/auth/authClient";
import { useNavigate } from "react-router-dom";
import { PATH } from '../../constants/paths';

/**
 * 로그아웃
 */
function useSignOut() {
    const navigate = useNavigate();
    const [error, setError] = useState<Error | null>(null);

    const userSignOut = async () => {
        try {
            // FB 로그아웃
            await signOut(auth)

            // 로그아웃 성공 시 페이지 이동
            navigate(PATH.ROOT, { replace: true });
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