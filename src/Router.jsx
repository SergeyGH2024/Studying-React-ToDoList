// Router - верхнеуровневая обёртка приложения, а не просто переиспользуемый компонент. Нужен для маршрутизации по страницам.

import { useEffect, useState } from 'react'

export const useRoute = () => {
	const [path, setPath] = useState(window.location.pathname) // Храним в состоянии текущий путь

	useEffect(() => {
		const onLocationChange = () => {
			setPath(window.location.pathname)
		}
	}, [])
}

const Router = () => {}

export default Router
