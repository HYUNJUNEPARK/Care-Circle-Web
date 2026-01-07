import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Body, Footer, Topbar, CenterLayout } from '../../components/layouts';
import Button from '../../components/buttons/Button';
import Input from '../../components/inputs/Input';
import { PATH } from '../../constants/paths';
import useSignInByEmail from './useSignInByEmail';
import strings from '../../res/strings'
import useAlert from '../../components/alert/useAlert';
import handleError from '../../utils/error/handleError';
import {
  clearRememberedId,
  loadRememberedId,
  saveRememberedId,
} from "../../utils/rememberIdStorage";


export default function SignIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signInByEmail, isLoading, error } = useSignInByEmail();
    const { showAlert } = useAlert();

    const [showPassword, setShowPassword] = useState(false);
    const [rememberId, setRememberId] = useState(false);

    // 최초 진입 시
    useEffect(() => {
        //저장된 아이디 불러오기
        const saved = loadRememberedId();
        if (saved) {
            setEmail(saved);
            setRememberId(true);
        }
    }, []);


    useEffect(() => {
        // 체크 해제 시 즉시 삭제
        if (!rememberId) {
            clearRememberedId();
        } else {
            // 체크를 켰는데 email이 이미 있으면 즉시 저장
            if (email.trim()) saveRememberedId(email.trim());
        }
    }, [rememberId]);

    /**
     * 로그인 예외 처리
     */
    useEffect(() => {
        if (!error) return;
        showAlert({
            title: "로그인 실패",
            message: handleError(error),
            cancelText: null
        });
    }, [error]);

    /**
     * 로그인 처리
     */
    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        //로그인 버튼 눌렀을 때 '아이디 기억하기' 설정에 따라 저장
        if (rememberId) {
            saveRememberedId(email.trim());
        } else {
            clearRememberedId();
        }

        await signInByEmail(email, password);

        navigate(PATH.ROOT, { replace: true });
    };

    return (
        <CenterLayout>
            <Container>
                <Topbar title={strings.signIn} />
                <Body>
                    {/* 로그인 폼 */}
                    <form onSubmit={handleSignIn} className="space-y-6 mt-8">
                        {/* 이메일 입력 */}
                        <Input
                            inputType='plaintext'
                            id="email"
                            label={"이메일"}
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => {
                                const emailValue = e.target.value;
                                setEmail(emailValue);

                                // 체크된 상태에서 입력이 바뀌면 최신 아이디로 즉시 반영
                                if (rememberId) saveRememberedId(emailValue.trim());
                            }}
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
                                    className="ml-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                    checked={rememberId}
                                    onChange={(e) => setRememberId(e.target.checked)}
                                />
                                <span className="ml-2 text-sm text-gray-600">아이디 기억하기</span>
                            </label>
                            {/* <div className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                비밀번호 찾기
                            </div> */}
                        </div>

                        {/* 로그인 버튼 */}
                        <Button
                            loading={isLoading}
                            buttonText={strings.signIn} />
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
                            {/* 구글 로그인 버튼 */}
                            <Button
                                buttonText="Google" />

                            {/*FaceBook 로그인 버튼*/}
                            <Button
                                buttonText="FaceBook" />
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
        </CenterLayout>
    );
};


