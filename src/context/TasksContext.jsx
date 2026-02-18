import { createContext, useState, useRef, useCallback, useEffect, useMemo } from "react"

// Кастомные хуки нужны чтобы объединить использование сразу нескольких хуков в одной функции и для переиспользования такого функционала.
// Н-р, можно создать свои там useForm or useModal - для валидации форм, очистки полей или логику открытия, закрытия модальных окон. 

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
    const { children } = props

    return (
        <TasksContext.Provider value={{
			tasks, filteredTasks, firstIncompleteTaskId, firstIncompleteTaskRef, deleteAllTasks, deleteTask, toggleTaskComplete,
			newTaskTitle, setNewTaskTitle, searchQuery, setSearchQuery, newTaskInputRef, addTask
		}}>
			{children}
		</TasksContext.Provider>
    )
}

