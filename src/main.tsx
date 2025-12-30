import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { initAuthPersistence } from './features/auth/authClient.ts'
import { AuthProvider } from './features/auth/AuthProvider.tsx'
import { AlertProvider } from './components/alert/AlertProvider.tsx';

async function bootstrap() {
  await initAuthPersistence();

  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AuthProvider>
        <AlertProvider>
          <App />
        </AlertProvider>
      </AuthProvider>
    </StrictMode>,
  )
}

bootstrap();