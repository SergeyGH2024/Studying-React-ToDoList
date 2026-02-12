// Так же мы можем задавать значения пропсов по-умолчанию, как и в параментарах функции

const Field = (props) => {
	const {
		className = '',
		id,
		label,
		type = 'text',
		onInput
	} = props
	return (
		<div className={`field ${className}`}>
			<label className='field__label' htmlFor={id}>
				{label}
			</label>
			<input
				className='field__input'
				id='new-task'
				placeholder=' '
				autoComplete='off'
				type={type}
				onInput={(event) => onInput(event.target.value)}
			/>
		</div>
	)
}

export default Field
