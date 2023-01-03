import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'
import axios, { type AxiosResponse } from 'axios'
import useAxios from '@/requests/useAxios'

export const useUserStore = defineStore('userStore', () => {

	const	loginApi: Ref = ref(localStorage.getItem('me') ? true : false)

	const	oauth42 = ref(localStorage.getItem('oauth42') ? true : false)

	const me: Ref = ref(loginApi.value ? JSON.parse(localStorage.getItem('me') || '') : '')

	function	updateMe(data: any) {
		localStorage.setItem('me', JSON.stringify(data))
		me.value = data
	}

	async function updateLoginApi() {
		const { response, loading, error } = await useAxios(
			'get',
			'/users/me'
		)
		if (response.value) {
			updateMe(response.value)
			loginApi.value = true
		}
		if (error.value) {
			// console.log('me error')
		}
	}

	async function register(username: string, email: string, password: string) {
		const { response, loading, error } = await useAxios(
			'post',
			'/auth/register',
			JSON.stringify({
				username,
				email,
				password
			})
		)
		await updateLoginApi()
		router.push({ path: '/' })
	}

	async function connect(email: string, password: string) {
		const { response, loading, error } = await useAxios(
			'post',
			'/auth/login',
			JSON.stringify({
				email,
				password
			})
		)
		await updateLoginApi()
		router.push({ path: '/' })
	}

	async function disconnect() {
		await useAxios(
			'delete',
			'/auth/disconnect'
		)
		localStorage.clear()
		me.value = ''
		loginApi.value = false
		if (!router.currentRoute.value.fullPath.includes('/accounts'))
			router.push({ path: '/accounts' })
	}

	async function forgotPassword(email: string) {
		const { response, loading, error } = await useAxios(
			'post',
			'/auth/forgot-password',
			JSON.stringify({
				email
			})
		)
	}

	return {
		oauth42,
		loginApi,
		me,
		updateMe,
		updateLoginApi,
		register,
		connect,
		disconnect,
		forgotPassword
	}
})