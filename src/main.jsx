import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext'
import { GroundProvider } from './context/GroundContext'
import { BookingProvider } from './context/BookingContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <GroundProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </GroundProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
