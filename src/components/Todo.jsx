import AddTaskForm from './AddTaskForm'
import SearchTaskForm from './SearchTaskForm'
import TodoInfo from './TodoInfo'
import TodoList from './TodoList'

// prop drilling - механика, при которой проп прокидывается н-р сверху через несколько компонентов вниз.

const Todo = () => {
	const tasks = [
		{ id: 'task-1', title: 'Купить молоко', isDone: false },
		{ id: 'task-2', title: 'Погладить кота', isDone: true },
	]

	const deleteAllTasks = () => {
		console.log("Delete all")
	}

	const deleteTask = (taskId) => {
		console.log(`delete task with id: ${taskId}`)	
	}

	const toggleTaskComplete = (taskId, isDone) => {
		console.log(`Zadacha ${taskId} ${isDone ? "Vipolnena" : "Ne vipolnena"}`)
	}

	const filterTasks = (query) => {
		console.log(`Search ${query}`)
	}

	return (
		<div className='todo'>
			<h1 className='todo__title'>To Do List</h1>
			<AddTaskForm />
			<SearchTaskForm onSearchInput={filterTasks}/>
			<TodoInfo
				total={tasks.length}
				done={tasks.filter(({ isDone }) => isDone).length}
				onDeleteAllButtonClick={deleteAllTasks}
			/>
			<TodoList
			 tasks={tasks}
			 onDeleteTaskButtonClick={deleteTask}
			 onTaskCompleteChange={toggleTaskComplete}
			 />
		</div>
	)
}

export default Todo
