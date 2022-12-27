import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'
import axios, { type AxiosResponse } from 'axios'
import useAxios from '@/request/axios'

export const useUserStore = defineStore('userStore', () => {

	const	loginApi: Ref = ref(localStorage.getItem('me') ? true : false)

	const	me: Ref = ref(loginApi.value ? JSON.parse(localStorage.getItem('me') || '') : '')

	async function    updateLoginApi() {
		const	{ response, loading, error } = await useAxios(
			'get',
			'/users/me'
		)
		if (response.value) {
			console.log('me ok')
			localStorage.setItem('me', JSON.stringify(response.value))
			me.value = response.value
			loginApi.value = true
		}
		if (error.value) {
			// console.log('Error = ', error.value)
			localStorage.removeItem('me')
			console.log('me error')
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
		await updateLoginApi()
		router.push({path: '/'})
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
		await updateLoginApi()
		router.push({path: '/'})
	}

	async function	disconnect() {
		const	{ response, loading, error } = await useAxios(
			'delete',
			'/auth/disconnect'
		)
		await updateLoginApi()
		router.push({path: '/accounts'})
	}

	async function	forgotPassword(email: string) {
		const	{ response, loading, error } = await useAxios(
			'post',
			'/auth/forgot-password',
			JSON.stringify({
				email
			})
		)
	}

	return {
		loginApi,
		me,
		updateLoginApi,
		register,
		connect,
		disconnect,
		forgotPassword
	}
})