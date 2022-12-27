import { ref, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'
import axios, { type AxiosResponse } from 'axios'
import useAxios from '@/request/axios'

export const useUserStore = defineStore('userStore', () => {

	const	loginApi: Ref = ref(false)

	const	user: Ref = ref(
		{
			"userName": "Vintran",
			"rank": 1,
			"level": 199,
			"levelProgression": 70,
			"stats": {
				"rankingPoints": 21539,
				"playCount": 304,
				"ratio": 4.8,
				"wins": 290,
				"defeats": 14
			}
		}
	)

	// const	me = ref(localStorage.getItem('me') || '')
	const	me: Ref = ref('')

	// sessionStorage or localStorage ?
	async function    updateLoginApi() {
		const	{ response, loading, error } = await useAxios(
			'get',
			'/users/me'
		)
		if (response.value) {
			console.log(response.value)
			// localStorage.setItem('me', JSON.stringify(response.value))
			me.value = response.value
			loginApi.value = true
		}
		if (error.value) {
			// console.log('Error = ', error.value)
			// localStorage.removeItem('me')
			me.value = ''
			loginApi.value = false
		}
	}

	async function	register(username: string, email: string, password: string) {
		const	{ response, loading, error } = await useAxios(
			'post',
			'/auth/register',
			JSON.stringify({
				username,
				email,
				password
			})
		)
		updateLoginApi()
	}

	async function	connect(email: string, password: string) {
		const	{ response, loading, error } = await useAxios(
			'post',
			'/auth/login',
			JSON.stringify({
				email,
				password
			})
		)
		updateLoginApi()
	}

	async function	disconnect() {
		const	{ response, loading, error } = await useAxios(
			'delete',
			'/auth/disconnect'
		)
		updateLoginApi()
		router.push({path:'/'})
	}

	return {
		loginApi,
		user,
		me,
		updateLoginApi,
		register,
		connect,
		disconnect
	}
})