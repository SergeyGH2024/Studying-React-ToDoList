// Router - верхнеуровневая обёртка приложения, а не просто переиспользуемый компонент. Нужен для маршрутизации по страницам.

import { useEffect, useState } from 'react'

export const useRoute = () => {
	const [path, setPath] = useState(window.location.pathname) // Храним в состоянии текущий путь

	useEffect(() => {
		const onLocationChange = () => {
			setPath(window.location.pathname)
		}

		// Эффект срабатывает 1 раз (из-за пустого массива зависимостей) после рендера компонента. В useEffect есть особое поведение (функция очистки) - если указать возврат какой-то функции из хука - то реакт запоминает её - и вызовет её только в случае, если компонент удалится.

		window.addEventListener('popstate', onLocationChange)

		return () => {
			window.removeEventListener('popstate', onLocationChange)
		}
	}, [])

	return path
}

const Router = props => {
	const { routes } = props // объект с путями (пути к компонентам страниц)
	const path = useRoute() // Возвращает текущий адрес путь
	const Page = routes[path] ?? routes['*'] // Страница соответствующая адресу с пути или страница с ошибкой

	return <Page />
}

export default Router
