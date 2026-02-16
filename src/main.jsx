// main.jsx - точка входа в js код, именно здесь происходит запуск реакт приложения

// createRoot - создаёт корень Реакт приложения - ищется элелент "root" и в него вставляется всё приложение

// <StrictMode> - специальная обёртка от реакт, которая помогает находить потенциальные проблемы в коде во время разработки

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles'

createRoot(document.getElementById('root')).render(
	// <StrictMode>
		<App />
	// </StrictMode>,
)
