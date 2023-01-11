import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSideBarStore = defineStore('sbStore', () => {

	const	state = reactive({
		section: 1,
		friendsState: 1,
		channelsState: 1,
		notifsState: 1
	})

	const	componentState = reactive({
		content: false,
		conv: false,
		convList: false,
		newChan: false,
	})

	const	toFind = ref('')

	const	newChan = ref(false)

	const	conv = reactive({
		open: false,
		type: '',
		id: '',
		lastMsg: '',
	})

	const	hiddenTags: string[] = reactive([])

	function	clearHiddenTags() {
		hiddenTags.splice(0)
	}

	function	updateSection(newVal: number) {
		if (newChan.value)
			newChan.value = false
		else if (conv.open)
			conv.open = false
		state.section = newVal
	}

	function	openConv(type: string, id: string = '') {
		conv.open = true
		conv.type = type
		conv.id = id
	}

	function	resetState() {
		state.section = 1
		state.friendsState = 1
		state.channelsState = 1
		state.notifsState = 1
		clearHiddenTags()
		componentState.content = false
		componentState.conv = false
		componentState.convList = false
		componentState.newChan = false
	}

	return {
		state,
		componentState,
		newChan,
		conv,
		hiddenTags,
		toFind,
		updateSection,
		openConv,
		clearHiddenTags,
		resetState
	}
})