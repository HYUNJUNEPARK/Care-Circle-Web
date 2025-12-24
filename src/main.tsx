import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAuthPersistence } from './features/firebase/authClient.ts'
import { AuthProvider } from './features/firebase/AuthProvider.tsx'

async function bootstrap() {
  await initAuthPersistence();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </StrictMode>,
  )
}

bootstrap();