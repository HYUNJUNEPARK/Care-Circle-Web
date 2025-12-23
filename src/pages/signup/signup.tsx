import { Container, Body, Footer, Topbar } from '../../components/layouts';
import Input from '../../components/inputs/Input';
import { useState, useMemo } from 'react';
import Button from '../../components/buttons/Button';
import { useNavigate } from "react-router-dom";
import useEmailValidation from './useEmailValidation'

export default function Signup() {
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
        if (!passwordConfirm) return { result: false, show: false, text: "비밀번호가 일치하지 않습니다.", };

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

        if (!passwordMatchingStatus.result || !email) return

        signup(email, password)
    };

    const signup = (id: string, password: string) => {
        //TODO 회원 가입 API 추가

        alert("ABC")
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