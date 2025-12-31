
import { Container, Body } from '../../components/layouts';
import { useAuth } from "../../features/auth/AuthProvider";
import { useEffect, useState } from "react";
import useSignOut from '../../hook/useSignOut';
import { getAllUsers } from '../../features/api/userApi';


export default function Admin() {
    const { user, isLoggedIn } = useAuth();
    const { userSignOut, error } = useSignOut();
    const [users, setUsers] = useState<any[]>([]);


    useEffect(() => {
        getUsers()
    }, []);

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        (async () => {
        })();
    }, [isLoggedIn]);

    useEffect(() => {
        if (!error) return
        alert(`${error.message}`)
    }, [error]);


    const getUsers = async () => {
        const idToken = await user?.getIdToken();

        const userList = await getAllUsers(idToken);
        console.error("userlist", userList)

        setUsers(userList);
    }

    return (
        <Container>
            <Body>
                <div>Admin Page</div>

                <p>{user?.email}</p>
                <p className='mt-12'>{user?.uid}</p>


                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.status}</td>
                    </tr>
                ))}

                <button onClick={userSignOut}>로그아웃</button>
            </Body>
        </Container>
    );
};