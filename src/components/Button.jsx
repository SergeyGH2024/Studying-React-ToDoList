// children - это специальный проп, который содержит в себе данные находящиеся между открывающим и закрывающим тегами компонента

const Button = (props) => {
	const {
		className='',
		type='button',
		children,
		isDisabled,
		onClick
	} = props
	return (
		<button className={`button ${className}`} type={type}
		 onClick={onClick}
		 disabled={isDisabled}
		 >
			{children}
		</button>
	)
}

export default Button
