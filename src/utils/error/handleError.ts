import axios from "axios";
import { FirebaseError } from "firebase/app";
import { firebaseAuthErrorMessageMap } from "./firebaseAuthErrorMessageMap";
import { axiosErrorMessageMap } from "./axiosErrorMessageMap";

/**
 * 
 */
export default function handleError(error: Error | unknown): string {
    if (axios.isAxiosError(error)) {
        console.info('axiosError', error);
        return axiosErrorMessageMap[error.code ?? ''] ?? `알 수 없는 오류가 발생했습니다.(code: ax-${error.code})`;
    } else if (isFirebaseError(error)) {
        console.info('firebaseError', error);
        return firebaseAuthErrorMessageMap[error.code] ?? `알 수 없는 오류가 발생했습니다.(code: fb-${error.code})`;
    } else {
        const e = error as Error
        console.info('else error', e);

        return e.message;
    }
}

function isFirebaseError(e: unknown): e is FirebaseError {
    // 웹 SDK에서는 보통 `instanceof FirebaseError`가 동작하지만,
    // 번들/중복 의존성 상황에서 깨질 수 있어 shape-check를 같이 둡니다. (확실하지 않음)
    if (e instanceof FirebaseError) return true;

    if (typeof e === "object" && e !== null) {
        const any = e as Record<string, unknown>;
        return (
            typeof any["code"] === "string" &&
            typeof any["message"] === "string" &&
            // FirebaseError는 name이 "FirebaseError"인 경우가 흔함 (SDK/환경에 따라 다를 수 있음)
            (any["name"] === "FirebaseError" || typeof any["name"] === "string")
        );
    }
    return false;
}