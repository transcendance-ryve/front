import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'
import axios, { type AxiosResponse } from 'axios'
import useAxios from '@/requests/useAxios'
import { useSocketIO } from '@/socket/socket.io'


export const useUserStore = defineStore('userStore', () => {

	const	loginApi: Ref = ref(localStorage.getItem('me') ? true : false)

	const	me: Ref = ref(loginApi.value ? JSON.parse(localStorage.getItem('me') || '') : '')

	const	socket: Ref<any> = ref(useSocketIO().socket)

	function	updateMe(data: any) {
		localStorage.setItem('me', JSON.stringify(data))
		me.value = data
	}

	return {
		loginApi,
		me,
		socket,
		updateMe,
	}
})