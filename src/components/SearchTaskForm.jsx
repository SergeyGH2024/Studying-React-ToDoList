// Вместо дублирования почти одинакового кода - просто меняем нужные пропсы в компоненте  
import Field from "./Field"
const SearchTaskForm = (props) => {
	const {
		onSearchInput
	} = props
	return (
		<form className='todo__form'>
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
			// onInput={(event) => onSearchInput(event.target.value)}
			onInput={onSearchInput}
			/>
		</form>
	)
}

export default SearchTaskForm
