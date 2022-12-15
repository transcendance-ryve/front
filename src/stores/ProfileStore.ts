import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'

export const useProfileStore = defineStore('profileStore', () => {

	const		type = ref(1)

	const		profile = ref()

	function	setProfile(user: Object) {
		profile.value = user
	}

	return {
		type,
		profile,
		setProfile
	}
})