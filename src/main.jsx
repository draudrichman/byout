import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode removed for production to prevent double renders and improve performance
createRoot(document.getElementById('root')).render(
  <App />
)
