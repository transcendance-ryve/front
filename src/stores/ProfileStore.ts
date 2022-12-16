import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'

export const useProfileStore = defineStore('profileStore', () => {

	const		type = ref(0)

	const		profile = ref()

	function	setProfile(user: Object, typeVal: number) {
		profile.value = user
		type.value = typeVal
	}

	return {
		type,
		profile,
		setProfile
	}
})