import Button from './Button'
import Field from './Field'

const AddTaskForm = (props) => {
	const { addTask,
		newTaskTitle,
		setNewTaskTitle
	 } = props

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
			/>
			<Button type='submit'>Add</Button>
		</form>
	)
}

export default AddTaskForm
