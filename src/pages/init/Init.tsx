
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { PATH } from "../../constants/paths";
import { firebaseAuth } from "../../network/auth/firebaseAuth";
import { syncMeToServer } from '../../network/api/userApis';
import useSignOut from '../../hook/useSignOut';
import useAlert from "../../../src/components/alert/useAlert";
import handleError from "../../utils/error/handleError";
import useUserInfo from "./useUserInfo";

export default function Init() {
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const { signOutCache } = useSignOut();
    const { fetchUserInfo } = useUserInfo();

    useEffect(() => {
        checkUserStatus();
    }, []);

    const checkUserStatus = async () => {
        try {
            // FB 로그인이 성공했다면, user 정보가 있음
            const user = firebaseAuth?.currentUser;
            if (!user) {
                // signin 화면 단계에서 FB 로그인 실패 -> 로그인 화면으로 이동
                navigate(PATH.SIGN_IN, { replace: true });
                return;
            }

            //로그인 사용자 상태 조회
            const userInfo = await fetchUserInfo();
            const role = userInfo.role;
            const status = userInfo.status;

            //일반 사용자 활성, 비활성 유저 분기
            if (status === 'ACTIVE') {
                //활성 유저

                //TODO Hook 으로 교체
                //const idToken = await user?.getIdToken();
                await syncMeToServer();

                //일반 사용자, 관리자 분기
                if (role === 'ADMIN') {
                    //관리자 페이지 이동
                    navigate(PATH.DASH_BOARD, { replace: true });
                    return;
                }

                if (role === 'USER') {
                    //관리자 페이지 이동
                    navigate(PATH.MAIN, { replace: true });
                    return;
                }
            } else {
                //비활성 유저
                navigate(`${PATH.NOT_ACTIVE}?status=${status}`, { replace: true });
                return;
            }
        } catch (error) {
            console.error('사용자 상태 확인 중 오류 발생:', error);
            showAlert({
                title: "사용자 정보를 가져오는데 실패하였습니다.",
                message: handleError(error),
                cancelText: null,
                onConfirmAction: async () => {
                    await signOutCache();
                    navigate(PATH.SIGN_IN, { replace: true });
                }
            });
        }
    }

    return (
        <></>
    );
};