import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('contentStore', () => {
	const	state = ref(1)
	const	navbarListOpen = ref(false)

	return {
		state,
		navbarListOpen
	}
})