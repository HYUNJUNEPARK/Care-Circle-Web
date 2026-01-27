/**
 * Vite 환경 변수 타입 정의 파일
 * 
 * 이 파일은 필수 아님
 * 삭제해도 앱은 정상 동작
 * 
 * 
 * IDE에서 import.meta.env.VITE_XXX 자동완성 지원
 * 오타 방지 및 타입 안전성 제공
 * 프로젝트에서 사용하는 환경 변수를 한눈에 파악 가능
 */

/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Firebase
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
  
  // Network
  readonly VITE_API_SERVER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
