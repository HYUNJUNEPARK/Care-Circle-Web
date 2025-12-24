
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { PATH } from "../../constants/paths";
import { auth } from "../../features/auth/authClient";

export default function Init() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = auth.currentUser;
        const path = user ? PATH.MAIN : PATH.SIGN_IN;
        navigate(path, { replace: true });
    }, []);

    return (
        <></>
    );
};