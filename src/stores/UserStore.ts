import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { useSocketIO } from '@/socket/socket.io'
import type { UserConnected } from '@/types/User'

export const useUserStore = defineStore('userStore', () => {

	const	loginApi: Ref<boolean> = ref(localStorage.getItem('me') ? true : false)

	const	me: Ref<UserConnected> = ref(loginApi.value ? JSON.parse(localStorage.getItem('me') || '') : '')

	const	socket: Ref<any> = ref()

	function	updateMe(data: any) {
		localStorage.setItem('me', JSON.stringify(data))
		me.value = data
	}

	function	connectSocket() {
		socket.value = useSocketIO().socket
	}

	return {
		loginApi,
		me,
		socket,
		updateMe,
		connectSocket
	}
})