
import { Container, Body } from '../../components/layouts';
import { useAuth } from "../../features/auth/AuthProvider";
import { useEffect } from "react";

export default function Main() {
    const { user, isLoggedIn } = useAuth();

    useEffect(() => {
        if (!isLoggedIn) {
            //setMe(null);
            return;
        }

        (async () => {
            // ✅ 여기서 apiClient는 인터셉터로 Authorization 자동 첨부
            //const res = await apiClient.get("/api/users/me");
            //setMe(res.data);
        })();
    }, [isLoggedIn]);

    return (
        <Container>
            <Body>
                <div>Main Page</div>


                <p>{user?.email}</p>
                <p className='mt-12'>{user?.uid}</p>
                <p className='mt-12'>{user?.getIdToken()}</p>

            </Body>
        </Container>
    );
};