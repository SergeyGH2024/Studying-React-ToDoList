const escapeHTML = unsafeString => {
	// Функция будет экранировать потенциально опасные символы, чтобы текст не превращался в html
	return unsafeString
		.replaceAll(/</g, '&lt;')
		.replaceAll(/>/g, '&gt;')
		.replaceAll(/"/g, '&quot;')
		.replaceAll(/'/g, '&#39;')
}

const escapeRegExp = unsafeString => {
	// Будет экранировать спецсимволы, чтобы при их вводе в поисковую строку функция подсветки не путала символы с паттерном регулярки
	return unsafeString.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const highlightCaseInsensitive = (text, query) => {
	// Принимает оригинальный текст и то, что ввели в поле поиска
	const safeText = escapeHTML(text)
	const queryFormatted = query.trim()

	if (queryFormatted.length === 0) {
		return safeText
	}

	const pattern = new RegExp(escapeRegExp(queryFormatted), 'ig')

	return safeText.replace(pattern, `<mark>$&</mark>`)
}
