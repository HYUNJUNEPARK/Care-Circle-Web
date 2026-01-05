# React + TypeScript + Vite

- 프로젝트 생성
npm create vite@latest my-app -- --template react-ts

- npm ls vite -> (empty)
npm i -D vite @vitejs/plugin-react

# react-router-dom
npm install react-router-dom

# react-icons
- 리액트에서 제공하는 아이콘 패키지
npm install react-icons

# tailwind
1.패키지 설치
npm i -D tailwindcss @tailwindcss/vite

2.vite.config.ts에 플러그인 추가
```
    import { defineConfig } from "vite";
    import react from "@vitejs/plugin-react";
    import tailwindcss from "@tailwindcss/vite";

    export default defineConfig({
    plugins: [react(), tailwindcss()],
    });
```

3.전역 CSS(예: src/index.css)에 추가
@import "tailwindcss";

# axios
npm install axios

# tanstack
npm install @tanstack/react-query

# firebase
npm install firebase