import { useEffect, useState, useRef, useCallback } from 'react'
import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'
import Button from './Button'

// prop drilling - механика, при которой проп прокидывается н-р сверху через несколько компонентов вниз.

// Обычная переменная в реакт существует 1 раз - при перезагрузке компонента она возвращается к начальному значению.

// Чтобы изменения в приложении были видны (обновлялись) - нужно использовать состояние. Состояние храниться внутри реакт и когда оно меняется реакт сам запускает
//  перерисовку компонента с обновленными данными и нам не нужно вручную обновлять интерфейс. Для работы с состоянием есть втроенная функция (хук) в реакт "useState".
// хук useState при использовании возвращает 2 значения - это текущее значение (value) и функцию для его обновления (setValue). Так же можно передать начальное значение.
// Изменять переменную со state нужно только функцией setValue - для того чтобы реакт правильно отработал.

// Хуки реакта можно вызывать только в теле компонента на 1 уровне или внутри собственных хуков. В других функциях, условиях и в разметке
//  их использовать нельзя.

//useEffect запускается как минимум один раз, порядок в коде важен

// В реакт есть 2 похдода к работе с формами и их компонентами - управляемый и неуправляемый: state.
// Управляемый - это когда значение поля хранится во внутреннем состоянии и обновляется при кажддом вводе. Значение контролируется через state.
// Неуправляемый подход нужен тогда, когда нам нужно быстро обратится к ДОМ-элементу и навесить н-р фокус, не вызывая при этом лишний ререндр.

// Ещё useRef используется для хранения произвольных данных, которые не нужно отрисовывать - н-р - ИД таймера, какой-то сччетчик.

// При ререндере реакт прогружает компонент - потом сравнивает что именно изменилось и обновляет именно эти части компонента, а не весь. 
// Реакт не трогает ДОМ элементы без необходимости - он обновляет только то, что реально изменилось. ПРОБЛЕМА в том, что при ререндере заново 
// выполняется весь код компонента - создаются объекты там и т.д. И это влияет на производительность. При любом изменнении состояния реакт 
// вызывает ререндр компонента, а вместе с ним и всех дочерних элементов, даже если их данные не изменились.
// Во избежание таких ненужных ререндеров существуют оптимизационные инструменты - ReactMEMO - чтобы компонент не ререндерился без необходимости,
// useMEMO - чтобы кешировать сложные вычисления и useCallback - чтобы стабилизировать функции.
// В реакт в.19 есть уже встроенные инструменты оптимизации.

// Мы можем передать компонент в функцию memo(component) - тем самым запретив перерисовку этого компонента ЕСЛИ ИМЕННО его пропсы не меняются.
// НО, пропы могут содержать функции, которые объявлены в теле изменяемого компонента и при его перерисовке memo подумает, что проп изменился - 
// так как функция создалась заново (а функции сравниваются по ссылке, как объекты) и это вызовет ререндр компонента.
// Чтобы это исправить в реакт есть хук useCallback - позволяющий запомнить функцию между рендерами, чтобы она не пересоздавалась каждый раз.
// Первый аргумент useCallback - это нужная нам функция, которую нужно запомнить - второй массив зависимостей.
// хук useCallback полезен там, где нужно передавать обработчики в дочерние компоненты, обёрнутые в реакт memo.


const Todo = () => {
	console.log('Todo')
	
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

	const newTaskInputRef = useRef(null) // Данная переменная будет содержать ДОМ элемент, которому в атрибут ref мы передаём её.
	const firstIncompleteTaskRef = useRef(null)
	const firstIncompleteTaskId = tasks.find(({isDone}) => !isDone)?.id

	const deleteAllTasks = useCallback(() => {
		const isConfirmed = confirm('Are you sure you want delete all?')

		if (isConfirmed) {
			setTasks([])
		}
	}, [])

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


	const addTask = () => {

		if (newTaskTitle.trim().length > 0) {
			const newTask = {
				id: crypto?.randomUUID() ?? Date.now().toString(),
				title: newTaskTitle,
				isDone: false,
			}

		setTasks([...tasks, newTask])
		setNewTaskTitle('')
		// newTaskInputRef.current.value = ''
		setSearchQuery('')
		newTaskInputRef.current.focus()

		}

		
	}

	useEffect(() => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}, [tasks])

	useEffect(() => {
		newTaskInputRef.current.focus()
	}, [])

	// const renderCount = useRef(0)
	// useEffect(() => {
	// 	renderCount.current++
	// })
	// console.log(`компонент отрендерился ${renderCount.current} raz`)  

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
			newTaskInputRef={newTaskInputRef}
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
			<Button onClick={() => firstIncompleteTaskRef.current?.scrollIntoView({behavior: 'smooth'})}>Show first incomplete task</Button>
			<TodoList
			 tasks={tasks}
			 filteredTasks={filteredTasks}
			 firstIncompleteTaskRef={firstIncompleteTaskRef}
			 firstIncompleteTaskId={firstIncompleteTaskId}
			 onDeleteTaskButtonClick={deleteTask}
			 onTaskCompleteChange={toggleTaskComplete}
			 />
		</div>
	)
}

export default Todo
