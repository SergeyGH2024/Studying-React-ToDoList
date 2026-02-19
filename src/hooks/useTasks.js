import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
// import useTasksLocalStorage from './useTasksLocalStorage'

const useTasks = () => {
	// const { savedTasks, saveTasks } = useTasksLocalStorage()

	// const [tasks, setTasks] = useState(
	// 	savedTasks ?? [
	// 		{ id: 'task-1', title: 'Купить молоко', isDone: false },
	// 		{ id: 'task-2', title: 'Погладить кота', isDone: true },
	// 	],
	// )

	const [tasks, setTasks] = useState([])

	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	const newTaskInputRef = useRef(null) // Данная переменная будет содержать ДОМ элемент, которому в атрибут ref мы передаём её.

	const deleteAllTasks = useCallback(() => {
		const isConfirmed = confirm('Are you sure you want delete all?')

		if (isConfirmed) {
			setTasks([])
		}
	}, [])

	const deleteTask = taskId => {
		setTasks(tasks.filter(task => task.id !== taskId))
	}

	const toggleTaskComplete = (taskId, isDone) => {
		setTasks(
			tasks.map(task => {
				if (task.id === taskId) {
					return { ...task, isDone }
				}
				return task
			}),
		)
	}

	const addTask = useCallback(title => {
		// if (newTaskTitle.trim().length > 0) {
		const newTask = {
			// id: crypto?.randomUUID() ?? Date.now().toString(),
			// title: newTaskTitle,
			title,
			isDone: false,
		}

		fetch('http://localhost:3001/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTask),
		})
			.then(response => response.json())
			.then(addedTask => {
				setTasks(prevTasks => [...prevTasks, addedTask])
				// setTasks([...tasks, newTask])
				setNewTaskTitle('')
				// newTaskInputRef.current.value = ''
				setSearchQuery('')
				newTaskInputRef.current.focus()
			})

		// }
	}, [])

	// useEffect(() => {
	// 	saveTasks(tasks)
	// }, [tasks])

	useEffect(() => {
		newTaskInputRef.current.focus()

		fetch('http://localhost:3001/tasks')
			.then(response => response.json())
			.then(setTasks)
	}, [])

	// const renderCount = useRef(0)
	// useEffect(() => {
	// 	renderCount.current++
	// })
	// console.log(`компонент отрендерился ${renderCount.current} raz`)

	const filteredTasks = useMemo(() => {
		const clearSearchQuery = searchQuery.trim().toLowerCase()

		return clearSearchQuery.length > 0
			? tasks.filter(({ title }) =>
					title.toLowerCase().includes(clearSearchQuery),
				)
			: null
	}, [searchQuery, tasks])

	return {
		tasks,
		filteredTasks,
		deleteAllTasks,
		deleteTask,
		toggleTaskComplete,
		newTaskTitle,
		setNewTaskTitle,
		searchQuery,
		setSearchQuery,
		newTaskInputRef,
		addTask,
	}
}

export default useTasks
