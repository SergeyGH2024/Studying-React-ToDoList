// Добавить 2 рефа на 1 ДОМ элемент нельзя, так как второй перезапишет первый
// Для того, чтобы можно было "манипулировать" рефами - создаётся этот хук

const useCombinedRefs = (...refs) => {
	return node => {
		refs.forEach(ref => {
			if (!ref) {
				return
			}

			if (typeof ref === 'function') {
				ref(node)
			} else {
				ref.current = node
			}
		})
	}
}

export default useCombinedRefs
