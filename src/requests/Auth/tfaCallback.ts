import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'
import { useNotifStore } from '@/stores/NotificationsStore'

const tfaCallback = async (code: string) => {
	const	id = router.currentRoute.value.query.id
	const	token = router.currentRoute.value.query.token

	const { response, error } = await useAxios(
		'post',
		'/auth/tfa/callback',
		{ id, token, code }
	)
	if (!error.value) {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
		userStore.loginApi = true
		useNotifStore().addNotif('success', 'Succes', 'You are now logged in')
		router.push({ path: '/' })
	}
}

export default tfaCallback