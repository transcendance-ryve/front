import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'
import { useNotifStore } from '@/stores/NotificationsStore'

export const	auth42 = async () => {
    const res = await useAxios('get', '/auth/42/redirect')
	if (res.response.value)
   		window.location.href = res.response.value;
}

export async function	callBack(code: string) {
	const	res = await useAxios('get', 'auth/42/callback?code=' + code)
	if (!res.error.value && res.response.value) {
		const { tfa, token, id } = res.response.value

		if (tfa)
			return router.push({ path: '/accounts/login/tfa',
				query: {
					token: token,
					id: id
				}
			})

		const userStore = useUserStore()
		userStore.updateMe(res.response.value)
		userStore.loginApi = true
		useNotifStore().addNotif('success', 'Succes', 'You are now logged in')
		router.push({ path: '/' })
	}
}
