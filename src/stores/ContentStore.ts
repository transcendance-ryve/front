import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContentStore = defineStore('contentStore', () => {
	const	state = ref(1)

	return {
		state
	}
})