import { useEffect, useRef, useState } from "react";
import { checkValidEmail } from '../../features/api/authApi';

type EmailCheckReseult = {
    result: boolean;
    message: string;
};

/**
 * 이메일 중복 확인 
 */
function useEmailValidation(email: string) {
    const [emailCheckResult, setEmailCheckResult] = useState<EmailCheckReseult>(
        {
            result: false,
            message: "",
        }
    );

    // 이메일 형식 체크
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailFormatValid = EMAIL_REGEX.test(email);

    // 요청 경합 방지용(빠르게 타이핑할 때 이전 요청 결과가 나중에 도착하는 문제)
    // 현재까지 발생한 요청 번호(카운터)를 저장.
    // useRef는 값이 바뀌어도 리렌더를 발생시키지 않고, 렌더 사이에 값이 유지(리렌더되더라도 reqIdRef.current는 그대로 유지)
    const reqIdRef = useRef(0);

    useEffect(() => {
        // 이메일 입력이 비었으면 초기화
        if (!email) {
            setEmailCheckResult(
                {
                    result: false,
                    message: ""
                }
            );
            return;
        }

        // 이메일 형식이 아니면 서버 요청하지 말고 결과 반환
        if (!isEmailFormatValid) {
            setEmailCheckResult(
                {
                    result: false,
                    message: "올바른 이메일이 아닙니다.",
                }
            );
            return;
        }


        const currentReqId = ++reqIdRef.current; //reqIdRef.current + 1
        let cancelled = false;

        (async () => {
            try {
                // 서버 중복 체크
                const res = await checkValidEmail(email);
                const isExist = Boolean(res?.data?.exists);

                // 가장 최신 요청만 반영
                if (cancelled || currentReqId !== reqIdRef.current) return;

                setEmailCheckResult(
                    {
                        result: !isExist,
                        message: isExist ? "사용 중인 이메일입니다." : "사용 가능한 이메일입니다.",
                    }
                );
            } catch (error) {
                if (cancelled || currentReqId !== reqIdRef.current) return;

                setEmailCheckResult(
                    {
                        result: false,
                        message: "이메일 확인 중 오류가 발생했습니다.",
                    }
                );
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [email]);

    return { emailCheckResult };
}

export default useEmailValidation;