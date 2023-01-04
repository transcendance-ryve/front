import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sbStore', () => {

	const	state = reactive({
		section: 1,
		friendsState: 1,
		channelsState: 1,
		notifsState: 1
	})

	const	toFind = ref('')

	const	newChan = ref(false)

	const	conv = reactive({
		open: false,
		type: '',
		name: '',
		status: ''
	})

	function	updateSection(newVal: number) {
		if (newChan.value)
			newChan.value = false
		else if (conv.open)
			conv.open = false
		state.section = newVal
	}

	function	openConv(type: string, name: string, status: string) {
		conv.open = true
		conv.type = type
		conv.name = name
		conv.status = status
	}

	return {
		state,
		newChan,
		conv,
		toFind,
		updateSection,
		openConv
	}
})