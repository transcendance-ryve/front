import useAxios from '@/requests/useAxios'
import { useUserStore } from '../../stores/UserStore'

export type userProfileData = { user: any, type: number, loadingData: boolean, err: null }

const	getType = (status: string) => {
	if (status === 'ACCEPTED')
		return 2
	return 3
}

const getUserProfile = async (id: string, data: userProfileData) => {
	const userStore = useUserStore()

	if (id == userStore.me.id) {
		data.type = 1
		data.user = userStore.me
	}
	else {
		data.loadingData = true
		const { response, loading, error } = await useAxios(
			'get',
			'/users/friends/'
			+ id
			+ '?select=id,username,avatar,level,experience,next_level,rank_point,wins,loses,played'
		)
		if (error.value) {
			//	handle errors
		}
		else if (response.value) {
			// console.log('in get profile', response.value)
			data.type = getType(response.value.status)
			data.user = response.value.user
		}
		data.loadingData = loading.value
		data.err = error.value
	}
}

export default getUserProfile