import useAxios from '@/requests/useAxios'
import { useUserStore } from '@/stores/UserStore'

const setAvatar = async (avatarFile: File) => {

	let	formData = new FormData()
	formData.set('image', avatarFile);

	const { response, error } = await useAxios(
		'put',
		'/users/avatar',
		{ image: formData.get('image') },
		{ headers: { 'content-Type': 'multipart/form-data;' } }
	)
	if (!error.value) {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
		return true
	}
	return false
}

export default setAvatar