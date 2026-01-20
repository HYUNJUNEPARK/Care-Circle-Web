import { Footer, Header } from '../../components/layouts';
import { Body, Container } from '../../components/layouts';
import Input from '../../components/inputs/Input';
import { useState, useMemo, useEffect } from 'react';
import Button from '../../components/buttons/Button';
import { useNavigate } from "react-router-dom";
import useEmailValidation from './useEmailValidation'
import useSignUpByEmail from './useSignUpByEmail';
import useAlert from '../../components/alert/useAlert';
import handleError from '../../utils/error/handleError';

export default function SignUp() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { showAlert } = useAlert();
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const { emailCheckResult } = useEmailValidation(email);
    const { emailSignUp, isLoading, error } = useSignUpByEmail();

    useEffect(() => {
        if (!error) return;
        console.log("회웝가입 에러", error)

        showAlert({
            title: "회원가입 실패",
            message: handleError(error),
            cancelText: null,
        });
    }, [error]);

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
     * 로그인 핸들러
     */
    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!passwordMatchingStatus.result || !emailCheckResult.result) return

        //signup(email, password)
        await emailSignUp(email, password)

    };

    return (
        <Container>
            <Header title='회원가입' onBackButtonClick={() => { navigate(-1) }} />

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
                    onClick={handleSignUp}
                    loading={isLoading}
                    buttonText='회원가입' />
            </Footer>

        </Container >
    );
};

