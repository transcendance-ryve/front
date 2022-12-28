import useAxios from '@/requests/useAxios'
import { useUserStore } from '../../stores/UserStore'

export type userProfileData = { user: any, type: number, loadingData: boolean, err: null }

const getUserProfile = async (id: string, data: userProfileData) => {
	const userStore = useUserStore()

	if (id == userStore.me.id) {
		console.log('fuck')
		data.type = 1
		data.user = userStore.me
	}
	else {
		data.loadingData = true
		const { response, loading, error } = await useAxios(
			'get',
			'/users/profile/' + id
		)
		data.loadingData = loading.value
		data.err = error.value
		if (!data.err) {
			data.type = response.value.isFriend ? 2 : 3
			data.user = response.value.user
		}
	}
}

export default getUserProfile