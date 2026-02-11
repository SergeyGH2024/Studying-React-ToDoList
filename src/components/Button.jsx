// children - это специальный проп, который содержит в себе данные находящиеся между открывающим и закрывающим тегами компонента

const Button = (props) => {
	const {
		className='',
		type='button',
		children
	} = props
	return (
		<button className={`button ${className}`} type={type}>
			{children}
		</button>
	)
}

export default Button
