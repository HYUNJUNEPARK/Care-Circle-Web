import useAuth from "../../../network/auth/useAuth";
import { useEffect, useState } from "react";
import useSignOut from '../../../hook/useSignOut';
import useAlert from "../../../components/alert/useAlert";
import useLoading from "../../../components/loading/loading/useLoading";
import { useNavigate } from "react-router-dom";
import { Body, Container, Header } from '../../../components/layouts';
import useSupplements from "../../../hook/useSupplements";

export default function Supplements() {
    const { user } = useAuth();
    const { signOut, isLoading, error } = useSignOut();
    const { showAlert } = useAlert();
    const { showLoading, hideLoading } = useLoading();
    const navigate = useNavigate();
    const { supplements, getSupplements } = useSupplements();

    //
    useEffect(() => {
        getSupplements(1);
    }, []);

    useEffect(() => {
        if (isLoading) {
            showLoading();
        } else {
            hideLoading();
        }
    }, [isLoading]);

    return (
        <Container>
            <Header
                title="영양제 관리"
                style={{
                    background: '#F7F9FC',
                }}
                onBackButtonClick={() => navigate(-1)}
            />

            <Body style={{
                padding: '12px',
                background: '#F7F9FC',
                position: 'relative',
                overflowX: 'hidden',
            }}>
                <div>
                    <div style={{
                        maxWidth: '672px',
                        margin: '0 auto',
                    }}>
                    </div>
                </div>
            </Body>
        </Container>
    );
};