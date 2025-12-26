
import { Container, Body } from '../../components/layouts';
import { useAuth } from "../../features/auth/AuthProvider";
import { useEffect } from "react";
import { delelteUserByUid } from '../../features/api/authApi';
import useSignOut from '../../hook/useSignOut';
import useChangeUserStatus from './useChangeUserStatus';

export default function Main() {
    const { user, isLoggedIn } = useAuth();
    const { userSignOut, error } = useSignOut();
    const { changeUserStatus, error: changeStatusError } = useChangeUserStatus();

    //
    useEffect(() => {
        if (!isLoggedIn) {
            //setMe(null);
            //navigate(-1);
            return;
        }

        (async () => {
            // ✅ 여기서 apiClient는 인터셉터로 Authorization 자동 첨부
            //const res = await apiClient.get("/api/users/me");
            //setMe(res.data);
        })();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!error) return
        alert(`${error.message}`)
    }, [error]);

    useEffect(() => {
        if (!changeStatusError) return
        alert(`${changeStatusError.message}`)
    }, [changeStatusError]);


    const delelteUser = async () => {
        const idToken = await user?.getIdToken();

        const isSuccess = await delelteUserByUid(idToken);

        if (isSuccess === true) {
            alert(`회원탈퇴 성공`);
        }
    }

    return (
        <Container>
            <Body>
                <div>Main Page</div>


                <p>{user?.email}</p>
                <p className='mt-12'>{user?.uid}</p>

                {/* <p className='mt-12'>{user?.getIdToken() || ""}</p> */}

                <button onClick={userSignOut}>로그아웃</button>

                <button onClick={delelteUser}>회원탈퇴</button>

                <button onClick={async () => {
                    await changeUserStatus('INACTIVE');
                }}>비활성</button>

            </Body>
        </Container>
    );
};