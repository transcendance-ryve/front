import useAxios from '@/requests/useAxios'
import axios from 'axios';


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
}

export default setAvatar