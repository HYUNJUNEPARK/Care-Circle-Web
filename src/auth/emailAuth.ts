import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type UserCredential,} from "firebase/auth";
import { auth } from "./firebase";

/**
 * 회원가입
 */
export async function signUpWithEmail(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
}

/**
 * firebase 이메일/비밀번호 로그인
 */
export async function signInWithEmail(email: string, password: string): Promise<UserCredential> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error('Error signing in with email and password', error);
        throw error;
    }
}

/**
 * 로그아웃
 */
export async function logout() {
    await signOut(auth);
}