import useAxios from '@/requests/useAxios'
import { useUserStore } from '@/stores/UserStore'


const setAvatar = async (avatarFile: File) => {

	let	image: FormDataEntryValue | null
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
	else {
		const	userStore = useUserStore()
		await userStore.updateLoginApi()
	}
}

export default setAvatar