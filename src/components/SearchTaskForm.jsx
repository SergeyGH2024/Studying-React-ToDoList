// Вместо дублирования почти одинакового кода - просто меняем нужные пропсы в компоненте
import Field from './Field'
const SearchTaskForm = props => {
	const { searchQuery, setSearchQuery } = props
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
				className='todo__field'
				label='Search task'
				id='search-task'
				type='search'
				value={searchQuery}
				onInput={event => setSearchQuery(event.target.value)}
			/>
		</form>
	)
}

export default SearchTaskForm
