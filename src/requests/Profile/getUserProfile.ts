import useAxios from '@/requests/useAxios'
import { useUserStore } from '../../stores/UserStore'
import type { ProfileData } from '@/types/ProfileData'

const	getType = (id: string, status: string, senderId: string) => {
	if (status === 'ACCEPTED')
		return 2
	else if (status === 'PENDING') {
		if (id !== senderId)
			return 4
		else
			return 5
	}
	return 3
}

const getUserProfile = async (id: string, data: ProfileData) => {
	const userStore = useUserStore()

	if (id === userStore.me.id) {
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
		if (!error.value) {
			data.type = getType(id, response.value.status, response.value.sender)
			data.user = response.value.user
		}
		data.loadingData = loading.value
		data.err = error.value
	}
}

export default getUserProfile