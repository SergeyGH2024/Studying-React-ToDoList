// Router - верхнеуровневая обёртка приложения, а не просто переиспользуемый компонент. Нужен для маршрутизации по страницам.

import { useEffect, useState } from 'react'

const matchPath = (path, route) => {
	// Будет сравнивать путь с юрл адреса с конкретным роутом ( + шаблонным)
	const pathParts = path.split('/')
	const routePaths = route.split('/')

	if (pathParts.length !== routePaths.length) {
		return null
	}

	const params = {}

	for (let i = 0; i < routePaths.length; i++) {
		if (routePaths[i].startsWith(':')) {
			const paramName = routePaths[i].slice(1)

			params[paramName] = pathParts[i]
		} else if (routePaths[i] !== pathParts[i]) {
			return null
		}
	}

	return params
}

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

	if (path.startsWith('/tasks/')) {
		const id = path.replace('/tasks/', '') // Получаем чистый ид
		const TaskPage = routes['/tasks/:id']

		return <TaskPage params={{ id }} />
	}

	const Page = routes[path] ?? routes['*'] // Страница соответствующая адресу с пути или страница с ошибкой

	return <Page />
}

export default Router
