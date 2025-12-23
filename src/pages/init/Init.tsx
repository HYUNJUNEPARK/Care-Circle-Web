
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { PATH } from "../../constants/paths";
import { auth } from "../../features/firebase/firebase";

export default function Init() {
    const navigate = useNavigate();

    //TODO 정상 동작 안함 !
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