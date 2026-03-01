import tasksAPI from '@/shared/api/tasks'
import {
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState,
} from 'react'
// import useTasksLocalStorage from './useTasksLocalStorage'

// useReducer - это реакт хук для более глубокой работы состояния, типа useState только правила изменения состояния описаны одной функцией редюсером.
// Благодаря useReducer исчезнет проблема с рассинхроном данных и всяческих багов, которые могут произойти при обычном изменении состояния, н-р, если меняется состояние за 400 мс, а в это же время ещё одна операция выполняется - теряется актуальность данных. Редьюсер всегда получает актуальный стейт. Его использование позволяет выполнять меньше лишних рендеров, в отличии н-р от мемоизированной сущности.

const tasksReducer = (state, action) => {
	// В state хранится массив задач tasks, v action будет приходить объект , у которого точно будет свойство type и опционально какие-то доп. данные. В значении свойства type будет строка в скриминг-снейк-кейс нотации (большими буквами с символами _ в качестве разделителя). Эта строка будет описывать выполняемое действие над данными.
	switch (action.type) {
		case 'SET_ALL': {
			// Для установки всех значений
			return Array.isArray(action.tasks) ? action.tasks : state // Если есть задачи - возвращаем их, иначе текущее состояние - сущность стейт.
		}
		case 'ADD': {
			// Для добавления одной задачи
			return [...state, action.task]
		}
		case 'TOGGLE_COMPLETE': {
			const { id, isDone } = action

			return state.map(task => {
				return task.id === id ? { ...task, isDone } : task
			})
		} // Для переключения isDone
		case 'DELETE': {
			return state.filter(task => task.id !== action.id)
		}
		case 'DELETE_ALL': {
			return []
		}
		default: {
			return state
		}
	}

	// Каждое такое действие должно вернуть новое состояние
}

const useTasks = () => {
	// const { savedTasks, saveTasks } = useTasksLocalStorage()

	// const [tasks, setTasks] = useState(
	// 	savedTasks ?? [
	// 		{ id: 'task-1', title: 'Купить молоко', isDone: false },
	// 		{ id: 'task-2', title: 'Погладить кота', isDone: true },
	// 	],
	// )

	// const [tasks, setTasks] = useState([])

	const [tasks, dispatch] = useReducer(tasksReducer, []) // Первый аргумент - ссылка на функцию редьюсер, с которой будет работать хук, второй аргумент - начальное знач. Общепринятое название при работе с хуком редьюсером dispatch - изменение стейт переменной.

	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [disappearingTaskId, setDisappearingTaskId] = useState(null)
	const [appearingTaskId, setAppearingTaskId] = useState(null)

	const newTaskInputRef = useRef(null) // Данная переменная будет содержать ДОМ элемент, которому в атрибут ref мы передаём её.

	const deleteAllTasks = useCallback(() => {
		const isConfirmed = confirm('Are you sure you want delete all?')

		if (isConfirmed) {
			// 	Promise.all(
			// 		tasks.map(({id}) => {
			// 			return fetch(`http://localhost:3001/tasks/${id}`, {
			// 	method: "DELETE",
			// })

			// 		})
			// 	)

			// tasksAPI.deleteAll(tasks).then(() => setTasks([]))
			tasksAPI.deleteAll(tasks).then(() => dispatch({ type: 'DELETE_ALL' }))
		}
	}, [tasks])

	const deleteTask = useCallback(
		taskId => {
			// fetch(`http://localhost:3001/tasks/${taskId}`, {
			// 	method: "DELETE",
			// })
			tasksAPI.delete(taskId).then(() => {
				setDisappearingTaskId(taskId)

				setTimeout(() => {
					// setTasks(tasks.filter(task => task.id !== taskId))
					dispatch({ type: 'DELETE', id: taskId })
					setDisappearingTaskId(null)
				}, 400)
			})
		},
		[],
		// [tasks], Теперь эта функция не пересоздаётся при каждом изменении массива зависимостей [tasks] и нам не нужны внешние данные, так как теперь мы сами передаём данные в редьюсер.
	)

	const toggleTaskComplete = useCallback((taskId, isDone) => {
		// fetch(`http://localhost:3001/tasks/${taskId}`, {
		// 	method: "PATCH",
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify({isDone})
		// })
		tasksAPI.toggleComplete(taskId, isDone).then(() => {
			// setTasks(
			// 	tasks.map(task => {
			// 		if (task.id === taskId) {
			// 			return { ...task, isDone }
			// 		}
			// 		return task
			// 	}),
			// )

			dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone })
		})
	}, [])

	const addTask = useCallback(title => {
		// if (newTaskTitle.trim().length > 0) {
		const newTask = {
			// id: crypto?.randomUUID() ?? Date.now().toString(),
			// title: newTaskTitle,
			title,
			isDone: false,
		}

		// fetch('http://localhost:3001/tasks', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(newTask),
		// })
		// 	.then(response => response.json())
		tasksAPI.add(newTask).then(addedTask => {
			// setTasks(prevTasks => [...prevTasks, addedTask])
			dispatch({ type: 'ADD', task: addedTask })
			// setTasks([...tasks, newTask])
			setNewTaskTitle('')
			// newTaskInputRef.current.value = ''
			setSearchQuery('')
			newTaskInputRef.current.focus()
			setAppearingTaskId(addedTask.id)
			setTimeout(() => {
				setAppearingTaskId(null)
			}, 400)
		})

		// }
	}, [])

	// useEffect(() => {
	// 	saveTasks(tasks)
	// }, [tasks])

	useEffect(() => {
		newTaskInputRef.current.focus()

		// fetch('http://localhost:3001/tasks')
		// .then(response => response.json())
		tasksAPI
			.getAll()
			// .then(setTasks)
			.then(serverTasks => dispatch({ type: 'SET_ALL', tasks: serverTasks }))
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
		disappearingTaskId,
		appearingTaskId,
	}
}

export default useTasks
