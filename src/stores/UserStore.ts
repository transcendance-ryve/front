import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'
import axios, { type AxiosResponse } from 'axios'
import useAxios from '@/request/axios'

export const useUserStore = defineStore('userStore', () => {

	const	loginApi = ref(false)

	const	user = ref(
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

	// sessionStorage or localStorage ?
	async function    updateLoginApi() {
		const	{ response, loading, error } = await useAxios(
			'get',
			'/users/me'
		)
		if (response.value) {
			console.log(response.value)
			loginApi.value = true
		}
		if (error.value) {
			// console.log('Error = ', error.value)
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
		updateLoginApi,
		register,
		connect,
		disconnect
	}
})