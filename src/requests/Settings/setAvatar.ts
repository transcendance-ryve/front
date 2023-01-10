import useAxios from '@/requests/useAxios'
import { useUserStore } from '@/stores/UserStore'


const setAvatar = async (avatarFile: File) => {

	let	formData = new FormData()
	formData.set('image', avatarFile);

	const { response, loading, error } = await useAxios(
		'put',
		'/users/avatar',
		{ image: formData.get('image') },
		{ headers: { 'content-Type': 'multipart/form-data;' } }
	)
	if (error.value) {
		//	handle errors
	}
	else if (response.value) {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
	}
}

export default setAvatar