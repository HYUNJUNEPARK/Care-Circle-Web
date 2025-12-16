
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { PATH } from "../../constants/paths";
import { auth } from "../../auth/firebase";

export default function Init() {
    const navigate = useNavigate();

    const movePage = () => {
        const user = auth.currentUser;
        const path = user ? PATH.MAIN : PATH.LOGIN;
        navigate(path, { replace: true });
    }

    useEffect(() => {
        movePage();
    }, []);

    return (
        <></>
    );
};