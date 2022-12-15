import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sbStore', () => {
	const	section = ref(1)
	const	friendsState = ref(1)
	const	channelsState = ref(1)
	const	notifsState = ref(1)

	const	newChan = ref(false)
	const	conv = ref({
		open: false,
		type: '',
		name: '',
		status: ''
	})

	const	toFind = ref('')

	function	updateSection(newVal: number) {
		if (newChan.value)
			newChan.value = false
		else if (conv.value)
			conv.value.open = false
		section.value = newVal
	}

	function	openConv(type: string, name: string, status: string) {
		conv.value.open = true
		conv.value.type = type
		conv.value.name = name
		conv.value.status = status
	}

	return {
		section,
		friendsState,
		channelsState,
		notifsState,
		newChan,
		conv,
		toFind,
		updateSection,
		openConv
	}
})