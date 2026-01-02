
import { useNavigate } from "react-router-dom";
import LoadingSpinner from '../../components/loading/spinner/LoadingSpinner';
import { useEffect } from 'react';
import { PATH } from "../../constants/paths";
import { auth } from "../../features/auth/authClient";
import { syncMeToServer } from '../../features/api/userApi';
import { getLoginUserInfo } from '../../features/api/userApi';
import useSignOut from '../../hook/useSignOut';

export default function Init() {
    const navigate = useNavigate();
    const { userSignOut } = useSignOut();

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            const user = auth?.currentUser;

            if (!user) {
                //로그인 화면으로 이동
                navigate(PATH.SIGN_IN, { replace: true });
                return;
            }

            // 로그인 사용자 상태 조회
            const idToken = await user?.getIdToken();
            if(!idToken) {
                throw Error('Invalid token'); 
            }
            const userInfo = await getLoginUserInfo(idToken);
            if (!userInfo) {
                //로그인 화면으로 이동
                navigate(PATH.SIGN_IN, { replace: true });
                return;
            }

            const role = userInfo.role;
            const status = userInfo.status;

            //일반 사용자, 관리자 분기
            if (role === 'ADMIN') {
                //관리자 페이지 이동
                navigate(PATH.DASH_BOARD, { replace: true });
                return;
            }

            //일반 사용자 활성, 비활성 유저 분기
            if (status === 'ACTIVE') {
                //활성 유저
                await syncMeToServer(idToken);
                navigate(PATH.MAIN, { replace: true });
                return;
            } else {
                //비활성 유저
                navigate(`${PATH.NOT_ACTIVE}?status=${status}`, { replace: true });
                return;
            }
        } catch (error) {
            console.error('checkUserStatus', error);
            await userSignOut();
            navigate(`${PATH.SIGN_IN}}`, { replace: true });
        }
    }

    return (
        <LoadingSpinner />
    );
};