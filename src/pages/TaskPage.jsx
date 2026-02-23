import { useEffect, useState } from 'react'
import tasksAPI from '../api/tasksAPI'

const TaskPage = props => {
	const { params } = props
	// const taskId = '123' // id задачи вытянутый с url (пока фиксированный)
	const taskId = params.id

	const [task, setTask] = useState(null) // Стейт-переменная. Данные о конкретной текущей задаче
	const [isLoading, setIsLoading] = useState(true) // Стейт-переменная.Переменные для статуса загрузки с сервера (по-умолч. тру, т.к. загр. выполняется сразу)
	const [hasError, setHasError] = useState(false) // Стейт-переменная.

	useEffect(() => {
		// Будет выполнять получение данных о задаче по её идентификатору
		tasksAPI
			.getById(taskId)
			.then(taskData => {
				setTask(taskData)
				setHasError(false)
			})
			.catch(() => {
				// На случай ошибки переключаем флаг на тру
				setHasError(true)
			})
			.finally(() => {
				// Меняем статус текущей загрузки
				setIsLoading(false)
			})
	}, [])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (hasError) {
		return <div>Task not found!</div>
	}

	return (
		<div>
			<h1>{task.title}</h1>
			<p>{task.isDone ? 'Task is done' : 'Task is not done'}</p>
		</div>
	)
}

export default TaskPage
