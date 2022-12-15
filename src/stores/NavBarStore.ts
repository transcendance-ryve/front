import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNavBarStore = defineStore('nbStore', () => {
	const	nbState = ref(1)

	return {
		nbState
	}
})