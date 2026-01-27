import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: '/',  // **권장** (Amplify 루트에 호스팅할 때)

  //로컬에서 프로젝트 실행 시 CORS 이슈로 인해 프록시 설정
  server: {
    //로컬에서 외부 접속 허용
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      '/care-circle': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/care-circle/, ''),
        secure: false, /* https 사용 안함, 운영에서 절대 사용 금지! */
      },
    }
  }
})
