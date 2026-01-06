
import { useAuth } from "../../features/auth/AuthProvider";
import { useEffect } from "react";
import useSignOut from '../../hook/useSignOut';

export default function Main() {
    const { user } = useAuth();
    const { signOut, error } = useSignOut();

    useEffect(() => {
        if (!error) return
        alert(`${error.message}`)
    }, [error]);

    return (
        <>
            <p>{user?.email}</p>
            <p>{user?.uid}</p>
            <button onClick={signOut}>로그아웃</button>
        </>
    );
};