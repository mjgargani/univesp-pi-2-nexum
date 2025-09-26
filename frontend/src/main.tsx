// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// cria o root e renderiza o componente App dentro do StrictMode - modo estrito do React
// https://react.dev/reference/react/StrictMode

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
