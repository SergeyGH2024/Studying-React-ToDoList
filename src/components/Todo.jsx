import { useEffect, useState } from 'react'
import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'

// prop drilling - механика, при которой проп прокидывается н-р сверху через несколько компонентов вниз.

// Обычная переменная в реакт существует 1 раз - при перезагрузке компонента она возвращается к начальному значению.

// Чтобы изменения в приложении были видны (обновлялись) - нужно использовать состояние. Состояние храниться внутри реакт и когда оно меняется реакт сам запускает
//  перерисовку компонента с обновленными данными и нам не нужно вручную обновлять интерфейс. Для работы с состоянием есть втроенная функция (хук) в реакт "useState".
// хук useState при использовании возвращает 2 значения - это текущее значение (value) и функцию для его обновления (setValue). Так же можно передать начальное значение.
// Изменять переменную со state нужно только функцией setValue - для того чтобы реакт правильно отработал.

// Хуки реакта можно вызывать только в теле компонента на 1 уровне или внутри собственных хуков. В других функциях, условиях и в разметке их использовать нельзя.

//useEffect запускается как минимум один раз, порядок в коде важен

const Todo = () => {
	const [tasks, setTasks] = useState( () => {
	const savedTasks = localStorage.getItem('tasks')

		if (savedTasks) {
			return JSON.parse(savedTasks)
		}

	return [{ id: 'task-1', title: 'Купить молоко', isDone: false },
			{ id: 'task-2', title: 'Погладить кота', isDone: true },]
	}

)

	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [searchQuery, setSearchQuery] = useState('')

	const deleteAllTasks = () => {
		const isConfirmed = confirm('Are you sure you want delete all?')

		if (isConfirmed) {
			setTasks([])
		}
	}

	const deleteTask = (taskId) => {
		setTasks(
			tasks.filter((task) => task.id !== taskId)
		)
	}

	const toggleTaskComplete = (taskId, isDone) => {
		setTasks(
			tasks.map((task) => {
				if (task.id === taskId) {
					return {...task, isDone}
				}
			return task
			})
		)
	}

	// 111

	const addTask = () => {
		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(),
				title: newTaskTitle,
				isDone: false,
			}

		setTasks([...tasks, newTask])
		setNewTaskTitle('')
		setSearchQuery('')
		}
	}

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	const clearSearchQuery = searchQuery.trim().toLowerCase()
	const filteredTasks = clearSearchQuery.length > 0 
	? tasks.filter(({title}) => title.toLowerCase().includes(clearSearchQuery))
	: null

	return (
		<div className='todo'>
			<h1 className='todo__title'>To Do List</h1>
			<AddTaskForm addTask={addTask}
			newTaskTitle={newTaskTitle}
			setNewTaskTitle={setNewTaskTitle}
			/>
			<SearchTaskForm
			 searchQuery={searchQuery}
			 setSearchQuery={setSearchQuery}
			 />
			<TodoInfo
				total={tasks.length}
				done={tasks.filter(({ isDone }) => isDone).length}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<TodoList
			 tasks={tasks}
			 filteredTasks={filteredTasks}
			 onDeleteTaskButtonClick={deleteTask}
			 onTaskCompleteChange={toggleTaskComplete}
			 />
		</div>
	)
}

export default Todo
