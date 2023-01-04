import useAxios from '@/requests/useAxios'

const sendFriendRequest = async (id: string) => {

	const { response, loading, error } = await useAxios(
		'post',
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

export default sendFriendRequest