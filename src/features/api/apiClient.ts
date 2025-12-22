import axios from "axios";

export const apiClient = axios.create({
  baseURL: `http://localhost:4000`,
  timeout: 15_000,
});

// 요청 인터셉터: Firebase ID Token을 Bearer로 자동 첨부
apiClient.interceptors.request.use(
  async (config) => {
    //const auth = getAuth();
    //const user = auth.currentUser;

    // 로그인 전/로그아웃 상태에서는 그냥 통과 (필요하면 여기서 throw로 막아도 됨)
    //if (!user) return config;

    // 필요 시 강제 갱신: user.getIdToken(true)
    //const idToken = await user.getIdToken();

    //config.headers = config.headers ?? {};
    //config.headers.Authorization = `Bearer ${idToken}`;

    return config;
  },

  (error) => Promise.reject(error)
);

// 응답 인터셉터: 401 공통 처리(선택)
apiClient.interceptors.response.use(
  res => res,
    async error => {
        console.log('apiClient response error:', error);

        //const originalRequest = error.config
        //logger.error(`authApi response error: [${error.response.status}]${error.message}`)

        // // 토큰 만료 에러 코드(예: 401) 확인
        // if ((error.response.status === 401) && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     try {
        //         // accessToken 갱신
        //         await accessTokenStore.refresh();
        //         // 갱신된 accessToken으로 헤더 갱신 후 재요청
        //         const newAccessToken = accessTokenStore.get();

        //         //토큰 만료 API 에 토큰을 교체 후 재요청
        //         originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        //         return privateAuthApi(originalRequest)
        //     } catch (error) {
        //         logger.error('auth Token refresh failed:', error);

        //         //모든 토큰 삭제 : 예상치 못한 예외가 발생한 경우 모두 삭제. 해당 코드가 없다면, 무한루프에 빠질 수 있음
        //         clearAllTokens();

        //         // 로그인 화면 이동
        //         window.alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        //         window.location.href = PATH.REDIRECT;
        //     }
        // }

        return Promise.reject(error)
    }


//   async



//   (error: AxiosError<any>) => {
//     // 서버에서 토큰 검증 실패하면 401
//     if (error.response?.status === 401) {
//       // 여기서 로그아웃 처리 / 로그인 페이지 이동 등을 할 수 있음 (프로젝트 정책에 맞게)
//       // 예: console.warn("Unauthorized - token invalid/expired");
//     }
//     return Promise.reject(error);
//   }



);
