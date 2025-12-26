
import { Container, Body } from '../../components/layouts';
import { useAuth } from "../../features/auth/AuthProvider";
import { useEffect } from "react";
import useSignOut from '../../hook/useSignOut';

export default function Admin() {
    const { user, isLoggedIn } = useAuth();
    const { userSignOut, error } = useSignOut();
    
    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        (async () => {
        })();
    }, [isLoggedIn]);``

    useEffect(() => {
        if (!error) return
        alert(`${error.message}`)
    }, [error]);


    return (
        <Container>
            <Body>
                <div>Admin Page</div>

                <p>{user?.email}</p>
                <p className='mt-12'>{user?.uid}</p>

                <button onClick={userSignOut}>로그아웃</button>
            </Body>
        </Container>
    );
};