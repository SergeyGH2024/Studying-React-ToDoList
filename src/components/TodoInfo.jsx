import { memo } from "react";


//В реакте обработчики указываются сразу в JSX-разметке. Нам не нужно искать элементы вручную по ДОМ-дереву.
// Имена событий пишутся в camelCase - onClick, onInput, onSubmit
// В значении пропа мы передаём функцию () => {}, а не строку. Или ссылку на функцию, НО не вызываем её {func}.
// Объект event в реакте не такой как в js. В реакт это SyntheticBaseEvent - это тот же объект event, но обернутый в дополнительный функционал.



const TodoInfo = (props) => {
	console.log("TodoInfo");
	
	const {
		total,
		done,
		onDeleteAllButtonClick
	} = props

	const hasTasks = total > 0

	return (
		<div className='todo__info'>
			<div className='todo__total-tasks'>
				Done {done} from {total}
			</div>
			{hasTasks && (
				<button className='todo__delete-all-button'
				 type='button'
				 onClick={onDeleteAllButtonClick }	
				 >
				Delete all
			</button>
		)}
		</div>
	)
}

export default memo(TodoInfo)
