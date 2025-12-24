import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Body, Footer, Topbar } from '../../components/layouts';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import { PATH } from '../../constants/paths';
import useEmailSignIn from './useEmailSignIn';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { emailSignIn, isLoading, error } = useEmailSignIn();
    
    /**
     * 로그인 처리
     */
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const isSuccess = await emailSignIn(email, password);

        if (isSuccess) {
            navigate(PATH.MAIN, { replace: true });
        }
    };

    /**
     * 로그인 예외 처리
     */
    useEffect(() => {
        if (!error) return;
        console.log("로그인 에러", error)
        alert("로그인 실패")
    }, [error]);

    return (
        <Container>
            <Topbar title='로그인' />

            <Body>
                {/* 로그인 폼 */}
                <form onSubmit={handleLogin} className="space-y-6 mt-8">
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

                    {/* 비밀번호 입력 */}
                    <Input
                        inputType='password'
                        id="password"
                        label={"비밀번호"}
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        show={showPassword}
                        setShow={setShowPassword}
                    />

                    {/* 비밀번호 찾기 */}
                    <div className="flex items-center justify-between mb-14">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">로그인 유지</span>
                        </label>
                        <div className="text-sm font-medium text-blue-600 hover:text-blue-500">
                            비밀번호 찾기
                        </div>
                    </div>

                    {/* 로그인 버튼 */}
                    <Button
                        loading={isLoading}
                        loadingText='로그인 중'
                        buttonText='로그인' />
                </form>

                {/* 소셜 로그인 */}
                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white text-gray-500">또는</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-3">
                        <button
                            type="button"
                            className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path fill="#EA4335" d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z" />
                                <path fill="#34A853" d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z" />
                                <path fill="#4A90E2" d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z" />
                                <path fill="#FBBC05" d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z" />
                            </svg>
                            Google
                        </button>

                        <button
                            type="button"
                            className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                        >
                            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </button>
                    </div>
                </div>
            </Body>

            <Footer>
                {/* 회원가입 링크 */}
                <div className="text-center">
                    <span className="text-sm text-gray-600 mr-2">
                        계정이 없으신가요?
                    </span>

                    <span className="text-sm font-medium text-blue-600 hover:text-blue-500" onClick={() => navigate(PATH.SIGN_UP)}>
                        회원가입
                    </span>
                </div>
            </Footer>
        </Container >
    );
};