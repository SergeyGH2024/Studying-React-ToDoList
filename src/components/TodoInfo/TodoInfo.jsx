import { memo, useContext, useMemo } from 'react'
import { TasksContext } from '../../context/TasksContext'

//В реакте обработчики указываются сразу в JSX-разметке. Нам не нужно искать элементы вручную по ДОМ-дереву.
// Имена событий пишутся в camelCase - onClick, onInput, onSubmit
// В значении пропа мы передаём функцию () => {}, а не строку. Или ссылку на функцию, НО не вызываем её {func}.
// Объект event в реакте не такой как в js. В реакт это SyntheticBaseEvent - это тот же объект event, но обернутый в дополнительный функционал.

const TodoInfo = props => {
	const { styles } = props

	// const {
	// 	total,
	// 	done,
	// 	onDeleteAllButtonClick
	// } = props

	const { tasks, deleteAllTasks } = useContext(TasksContext)

	const total = tasks.length
	const hasTasks = total > 0
	const done = useMemo(() => {
		return tasks.filter(({ isDone }) => isDone).length
	}, [tasks])

	return (
		<div className={styles.info}>
			<div className={styles.totalTasks}>
				Done {done} from {total}
			</div>
			{hasTasks && (
				<button
					className={styles.deleteAllButton}
					type='button'
					onClick={deleteAllTasks}
				>
					Delete all
				</button>
			)}
		</div>
	)
}

export default memo(TodoInfo)
