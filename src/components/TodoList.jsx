import TodoItem from './TodoItem'

// Пропсы (properties) я передаю в месте уже добавления компонента на страницу, а не в момент его создания.
//  Так же как при вызове функции аргументы. 
// Внутри компонента они приходят как объект. И мы можем можем взаимодействовать с ними уже внутри компонента.
// Приходящие данные с пропс обычно сразу деструктурируют

// Вместо дублирования тодо-элементов с разными пропсами, мы будем сами эти элементы(в виде объекта) принимать пропсом и обрабатывать методом массивов


const TodoList = (props) => {
	const { tasks = [], filteredTasks, onDeleteTaskButtonClick, onTaskCompleteChange, firstIncompleteTaskRef, firstIncompleteTaskId } = props

	const hasTasks = tasks.length > 0
	const isEmptyFilteredTasks = filteredTasks?.length === 0

	if (!hasTasks) {
		return <div className='todo__empty-message'>There are no tasks yet</div>
	}

	if (hasTasks && isEmptyFilteredTasks) {
		return <div className='todo__empty-message'>Tasks not found</div>

	}

	return (
		<ul className='todo__list'>
			{/* <TodoItem className='todo__item' id='task-1' title='Купить молоко' isDone={false}/>
			<TodoItem className='todo__item' id='task-2' title='Погладить кота' isDone/> */}

{/* Вместо разворачивания каждого приходящего пропа (используя значения ключей объекта) - можно развернуть объект оператором расширения ...
	Этот компонент отображает всё что ему приходит из вне.

			{tasks.map((task) => (
				<TodoItem 
				className='todo__item'
				id={task.id}
				title={task.title}
				isDone={task.isDone}
				/>
			))} */}

			{(filteredTasks ?? tasks).map((task) => (
				<TodoItem
				className='todo__item'
				key={task.id}
				ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
				onDeleteTaskButtonClick={onDeleteTaskButtonClick}
				onTaskCompleteChange={onTaskCompleteChange}
				{...task}
				/>
			))}
			
		</ul>
	)
}

export default TodoList
