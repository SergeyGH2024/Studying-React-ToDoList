import { useContext, useState } from 'react'
import Button from './Button'
import Field from './Field'
import { TasksContext } from '../context/TasksContext'

const AddTaskForm = () => {
	const { addTask,
		newTaskTitle,
		setNewTaskTitle,
		newTaskInputRef
	 } = useContext(TasksContext)

	 const [error, setError] = useState('')

	 const clearNewTaskTitle = newTaskTitle.trim()
	 const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0

	const onSubmit = (event) => {
		event.preventDefault()
		if (!isNewTaskTitleEmpty) {
		addTask(clearNewTaskTitle)

		}
	}

	const onInput = (event) => {
		const {value} = event.target
		const clearValue = value.trim()
		const hasOnlySpaces = value.length > 0 && clearValue.length === 0

		setNewTaskTitle(value)
		setError(hasOnlySpaces ? 'The tasks cannot be empty' : '')
	}

	// При срабатывании события onInput на поле ввода запускается функция сет, которая меняет текущее значение и триггерит ререндер.
	// Следовательно компонент ререндерится с новым значением во внутреннем поле ввода.

	return (
		<form className='todo__form' onSubmit={onSubmit}>
			<Field
			className='todo__field'
			label='New task title'
			id='new-task'
			error={error}
			value={newTaskTitle}
			onInput={onInput}
			ref={newTaskInputRef}
			/>
			<Button
			 type='submit'
			 isDisabled={isNewTaskTitleEmpty}
			 >Add</Button>
		</form>
	)
}

export default AddTaskForm
