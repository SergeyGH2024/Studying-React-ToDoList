import { TasksContext } from '@/entities/todo'
import RouterLink from '@/shared/ui/RouterLink'
import { highlightCaseInsensitive } from '@/shared/utils/highlight'
import { memo, useContext } from 'react'
import styles from './TodoItem.module.scss'

// Внутри ребёнка я вытягиваю переданные от родителя пропсы и использую их в компоненте.
// Компонент не должен изменять переданный пропс, он их только читает

// Component - это не дом, не элемент - это функция, возвращающая описание будущего ДОМ дерева, в теле которой уже могут быть дом-элементы.

const TodoItem = props => {
	const {
		className,
		id,
		title,
		isDone,
		//  onDeleteTaskButtonClick, onTaskCompleteChange, ref
	} = props

	const {
		firstIncompleteTaskRef,
		firstIncompleteTaskId,
		deleteTask,
		toggleTaskComplete,
		disappearingTaskId,
		appearingTaskId,
		searchQuery,
	} = useContext(TasksContext)

	// const highlightedTitle =
	// 	searchQuery.length > 0
	// 		? title.replaceAll(
	// 				new RegExp(searchQuery, 'gi'), // Поиск вхождений будет в обоих регистрах
	// 				`<mark>$&</mark>`, // Вставляет исходный текст в нужном регистре (searchQuery)
	// 			)
	// 		: title

	const highlightedTitle = highlightCaseInsensitive(title, searchQuery)

	// const animationRef = useRef(null)
	// const combinedRef = useCombinedRefs(
	// 	id === firstIncompleteTaskId ? firstIncompleteTaskRef : null,
	// 	animationRef,
	// )

	// Комбо рефы и handleClick больше не нужны, так как прокидываем стили через стейт переменную

	// const handleClick = () => {
	// 	animationRef.current?.classList.add(styles.isDisappearing)
	// 	console.log(animationRef)

	// 	setTimeout(() => {deleteTask(id)}, 400)
	// }

	return (
		<li
			className={`
			${styles.todoItem}
			${className}
			${disappearingTaskId === id ? styles.isDisappearing : ''}
			${appearingTaskId === id ? styles.isAppearing : ''}
			`}
			ref={id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
		>
			<input
				className={styles.checkbox}
				id={id}
				type='checkbox'
				checked={isDone}
				onChange={({ target }) => toggleTaskComplete(id, target.checked)}
			/>
			<label className={`${styles.label} visually-hidden`} htmlFor={id}>
				{title}
			</label>
			<RouterLink to={`tasks/${id}`} aria-label='Task detail page'>
				{/* {title} */}
				<span dangerouslySetInnerHTML={{ __html: highlightedTitle }} />
			</RouterLink>
			<button
				className={styles.deleteButton}
				aria-label='Delete'
				title='Delete'
				onClick={() => deleteTask(id)}
				// onClick={handleClick}
			>
				<svg
					width='20'
					height='20'
					viewBox='0 0 20 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
				>
					<path
						d='M15 5L5 15M5 5L15 15'
						stroke='#757575'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
			</button>
		</li>
	)
}

export default memo(TodoItem)
