// App.jsx - корневой компонент приложения, всё что мы увидим на странице - это содержимое этого файла

// Под капотом реакт компилирует эту разметку в более сложную и выполняет код

// JSX разметка соединяет синтаксис с html and js воедино, чтобы не писать 2 отдельных файла

// JSX return возвращает исключительно один элемент, н-р div или можно указать просто <>фрагмент</>

// {} внутри может выполнится выражение и вернётся текст

// Атрибуты, т.е. ПРОПСЫ пишутся в camelCase, а значения в фигурных скобках {}, если это не строка

// Для написания инлайновых стилей нужно использовать объект, а не строку как в html

//		<h1>To Do List</h1>
//		<p style={{ color: 'red' }}>Hi, {username}!</p>
//		<p>{new Date().toLocaleDateString()}</p>
//		{/* Комментарий внутри JSX */}
//		<label htmlFor='email'>Email: </label>
//		<input id='email' type='email' required={true} />

// Проверка булевых условий осуществляется оператором && или тернарным

// const username = 'Alex'
// const isLoggedIn = false

// const App = () => {
// 	let content

// 	if (isLoggedIn) {
// 		content = <p>Hi, {username}!</p>
// 	} else {
// 		content = <button>Log in</button>
// 	}

// 	return (
// 		<>
// 			<h1 className='title'>To Do List</h1>
// 			{content}
// 		</>
// 	)
// }

// export default App

// Компонент - это обычная джс функция, которая возвращает разметку. Принимающие входные параметры наз. ПРОПСЫ. На их основе компонент
// //  может рендерить интерфейс. Компонент - это нечто отдельное, элемент интерфейса, который можно переиспользовать в разных местах.

// Пропс - это способ передавать данные в компонент из вне.

// import Todo from './components/Todo'
// import { TasksProvider } from './context/TasksContext'

import Router from './Router'
import TaskPage from './pages/TaskPage'
import TasksPage from './pages/TasksPage'

const App = () => {
	const routes = {
		'/': TasksPage,
		// '/tasks/123': TaskPage, Вместо статичного пути теперь указываем шаблон
		'/tasks/:id': TaskPage,
		'*': () => <div>404 page not found</div>,
	}

	return (
		// <TasksProvider>
		// <Todo />
		// </TasksProvider>

		<Router routes={routes} />
	)
}

export default App
