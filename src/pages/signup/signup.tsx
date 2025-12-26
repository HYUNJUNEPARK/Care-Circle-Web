import { Container, Body, Footer, Topbar } from '../../components/layouts';
import Input from '../../components/inputs/Input';
import { useState, useMemo } from 'react';
import Button from '../../components/buttons/Button';
import { useNavigate } from "react-router-dom";
import useEmailValidation from './useEmailValidation'
import { signUpWithEmail } from '../../features/auth/emailAuth';
import { syncMeToServer } from '../../features/api/authApi';

export default function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { emailCheckResult } = useEmailValidation(email);

    /**
     * 비밀번호 일치 여부
     */
    const passwordMatchingStatus = useMemo(() => {
        if (!passwordConfirm) {
            return {
                result: false,
                show: false,
                text: "",
            };
        }

        if (password.length < 6) {
            return {
                result: false,
                show: true,
                text: "비밀번호는 최소 6자리 이상으로 설정해 주세요.",
            };
        }

        const result = (password === passwordConfirm);
        return {
            result,
            show: true,
            text: result ? "비밀번호가 일치합니다." : "비밀번호가 일치하지 않습니다.",
        };
    }, [password, passwordConfirm]);


    /**
     * 
     */
    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordMatchingStatus.result || !emailCheckResult.result) return

        signup(email, password)
    };

    /**
     * 
     */
    const signup = async (id: string, password: string) => {
        try {
            setIsLoading(true);

            //Auth 서버 등록
            const res = await signUpWithEmail(id, password);
            const idToken = await res.user.getIdToken();

            console.log("auth 서버", idToken);

            //Core 서버 등록
            await syncMeToServer(idToken);

            alert("회원 가입 성공");
        } catch (e) {
            console.log(`Error`, e);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Container>
            <Topbar title='회원가입' onBack={() => { navigate(-1) }} />

            <Body>
                {/* 로그인 폼 */}
                <div className="mt-8">
                    {/* 이메일 입력 */}
                    <Input
                        inputType='plaintext'
                        id="email"
                        label={"이메일"}
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                    />

                    <p style={{
                        margin: "12px 0px 12px 4px", //T R B L
                        textAlign: "left",
                        fontSize: 12,
                        minHeight: 22,
                        color: emailCheckResult.result ? "#0077ff" : "#e30d0dff",
                    }}>
                        {emailCheckResult.message}
                    </p>

                    {/* 비밀번호 입력 */}
                    <Input
                        id="password"
                        inputType='password'
                        label={"비밀번호"}
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        show={showPassword}
                        setShow={setShowPassword}
                    />

                    {/* 비밀번호 확인 */}

                    <div className='mt-6'>
                        <Input
                            id="passwordConfirm"
                            inputType='password'
                            label={"비밀번호 확인"}
                            placeholder="••••••••"
                            value={passwordConfirm}
                            onChange={e => setPasswordConfirm(e.target.value)}
                            show={showPasswordConfirm}
                            setShow={setShowPasswordConfirm}
                        />
                    </div>
                </div>

                {passwordMatchingStatus.show && (
                    <p style={{
                        textAlign: "left",
                        margin: "12px 0px 12px 4px", //T R B L
                        fontSize: 12,
                        color: passwordMatchingStatus.result ? "#0077ff" : "#e30d0dff",
                    }}>
                        {passwordMatchingStatus.text}
                    </p>
                )}
            </Body>

            <Footer>
                {/* 회원가입 버튼 */}
                <Button
                    onClick={handleSignup}
                    loading={isLoading}
                    loadingText='회원가입 중'
                    buttonText='회원가입' />
            </Footer>
        </Container >
    );
};