import { useContext } from 'react'
import Button from './Button'
import Field from './Field'
import { TasksContext } from '../context/TasksContext'

const AddTaskForm = () => {
	const { addTask,
		newTaskTitle,
		setNewTaskTitle,
		newTaskInputRef
	 } = useContext(TasksContext)
 
	const onSubmit = (event) => {
		event.preventDefault()
		addTask()
	}

	// При срабатывании события onInput на поле ввода запускается функция сет, которая меняет текущее значение и триггерит ререндер.
	// Следовательно компонент ререндерится с новым значением во внутреннем поле ввода.

	return (
		<form className='todo__form' onSubmit={onSubmit}>
			<Field 
			className='todo__field'
			label='New task title'
			id='new-task'
			value={newTaskTitle}
			onInput={(event) => setNewTaskTitle(event.target.value)}
			ref={newTaskInputRef}
			/>
			<Button type='submit'>Add</Button>
		</form>
	)
}

export default AddTaskForm
