import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAuthPersistence } from './features/auth/authClient.ts'
import { AuthProvider } from './features/auth/AuthProvider.tsx'
import { AlertProvider } from './components/alert/AlertProvider.tsx';
import { LoadingProvider } from './components/loading/loading/LoadingProvider.tsx'

async function bootstrap() {
  await initAuthPersistence();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <AlertProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </AlertProvider>
      </AuthProvider>
    </StrictMode>,
  )
}

bootstrap();