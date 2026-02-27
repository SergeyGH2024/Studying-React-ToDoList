import { createContext } from 'react'
import useIncompleteTaskScroll from '../hooks/useIncompleteTaskScroll'
import useTasks from '../hooks/useTasks'

// Кастомные хуки нужны чтобы объединить использование сразу нескольких хуков в одной функции и для переиспользования такого функционала.
// Н-р, можно создать свои там useForm or useModal - для валидации форм, очистки полей или логику открытия, закрытия модальных окон.

export const TasksContext = createContext({})

export const TasksProvider = props => {
	const { children } = props

	const {
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
	} = useTasks()

	const { firstIncompleteTaskId, firstIncompleteTaskRef } =
		useIncompleteTaskScroll(tasks)

	return (
		<TasksContext.Provider
			value={{
				tasks,
				filteredTasks,
				firstIncompleteTaskId,
				firstIncompleteTaskRef,
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
			}}
		>
			{children}
		</TasksContext.Provider>
	)
}
