import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base/_index.scss'
import './styles/layout/_index.scss'
import './styles/abstracts/_index.scss'
import App from './App.jsx'
import axios from 'axios'

axios.defaults.baseURL = "https://portfolio-2026-backend.vercel.app/"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)