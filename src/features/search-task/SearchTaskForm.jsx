// Вместо дублирования почти одинакового кода - просто меняем нужные пропсы в компоненте
import { TasksContext } from '@/entities/todo'
import Field from '@/shared/ui/Field'
import { useContext } from 'react'

const SearchTaskForm = props => {
	const { styles } = props

	const { searchQuery, setSearchQuery } = useContext(TasksContext)
	return (
		<form className='todo__form' onSubmit={event => event.preventDefault()}>
			{/* <div className='todo__field field'>
				<label className='field__label' htmlFor='search-task'>
					Search task
				</label>
				<input
					className='field__input'
					id='search-task'
					placeholder=' '
					autoComplete='off'
					type='search'
				/>
			</div> */}

			<Field
				className={styles.field}
				label='Search task'
				id='search-task'
				type='search'
				value={searchQuery}
				onInput={event => {
					;(setSearchQuery(event.target.value), console.log(1))
				}}
			/>
		</form>
	)
}

export default SearchTaskForm
