import useAxios from '@/requests/useAxios'

const acceptFriendRequest = async (id: string) => {

	const { response, loading, error } = await useAxios(
		'put',
		'/users/friends/'
		+ id
	)
	if (error.value) {
		//	handle errors
	}
	else if (response.value) {
		//	handle success
	}
}

export default acceptFriendRequest