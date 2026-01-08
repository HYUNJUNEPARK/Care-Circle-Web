import { useAuth } from "../../features/auth/AuthProvider";
import { useEffect } from "react";
import useSignOut from '../../hook/useSignOut';
import { Container, Body, CenterLayout } from '../../components/layouts';
import useAlert from "../../components/alert/useAlert";
import useLoading from "../../components/loading/loading/useLoading";
import { useNavigate } from "react-router-dom";
import { PATH } from '../../constants/paths';

export default function Main() {
    const { user } = useAuth();
    const { signOut, isLoading, error } = useSignOut();
    const { showAlert } = useAlert();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [isLoading]);


    useEffect(() => {
        if (!error) return;
        showAlert({
            title: '로그아웃 실패',
            message: error.message,
            cancelText: null,
        });
    }, [error]);

    const handleSignOut = async () => {
        await signOut();
        navigate(PATH.ROOT, { replace: true });
    }


    return (
        <CenterLayout>
            <Container>
                <Body>
                    <p>{user?.email}</p>
                    <p>{user?.uid}</p>
                    <button onClick={() => {
                        handleSignOut();
                    }}>로그아웃</button>
                </Body>
            </Container>
        </CenterLayout >
    );
};