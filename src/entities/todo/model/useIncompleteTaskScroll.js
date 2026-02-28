import { useRef } from 'react'

const useIncompleteTaskScroll = tasks => {
	const firstIncompleteTaskRef = useRef(null) // Сюда попадает ДОМ элемент, которому мы добавим в свойство ref эту же переменную - выходит двусторонняя связка
	const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id

	return {
		firstIncompleteTaskRef,
		firstIncompleteTaskId,
	}
}

export default useIncompleteTaskScroll
