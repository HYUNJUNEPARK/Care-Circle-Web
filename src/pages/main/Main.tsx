import { useAuth } from "../../features/auth/AuthProvider";
import { useEffect } from "react";
import useSignOut from '../../hook/useSignOut';
import { Container, Body, CenterLayout } from '../../components/layouts';
import useAlert from "../../components/alert/useAlert";
import useLoading from "../../components/loading/loading/useLoading";

export default function Main() {
    const { user } = useAuth();
    const { signOut, isLoading, error } = useSignOut();
    const { showAlert } = useAlert();
    const { showLoading, hideLoading } = useLoading();

    useEffect(() => {
        if (!error) return;
        showAlert({
            title: '로그아웃 실패',
            message: error.message,
            onConfirmAction: async () => {
                await signOut();
            }
        });
    }, [error]);

    useEffect(() => {
        if (isLoading) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [isLoading]);

    return (
        <CenterLayout>
            <Container>
                <Body>
                    <p>{user?.email}</p>
                    <p>{user?.uid}</p>
                    <button onClick={signOut}>로그아웃</button>
                </Body>
            </Container>
        </CenterLayout >
    );
};