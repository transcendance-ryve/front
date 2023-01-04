import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

export const	auth42 = async () => {
    const res = await useAxios('get', '/auth/42/redirect')
	if (res.response.value)
   		window.location.href = res.response.value;
}

export async function	callBack(code: string) {
	console.log('oui')
	const	res = await useAxios('get', 'auth/42/callback?code=' + code)
	if (res.response.value) {
		const userStore = useUserStore()
		await userStore.updateLoginApi()
		router.push({ path: '/' })
	}
}
