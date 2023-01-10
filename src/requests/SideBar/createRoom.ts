import useAxios from '@/requests/useAxios'
import type { DataForm } from '@/components/SideBar/SideBarNewChan.vue'


const createRoom = async (data: DataForm) => {

	let	formData = new FormData()
	formData.set('image', data.avatarFile);

	const { response, loading, error } = await useAxios(
		'post',
		'/channels/createRoom',
		{
			createInfo: {
				name: data.name,
				status: data.status,
				password: data.password,
				users: { id: data.invitees }
			},
			image: formData.get('image')
		},
		{ headers: { 'content-Type': 'multipart/form-data;' } }
	)
	if (error.value) {
		//	handle errors
	}
	else if (response.value) {
		console.log(response.value)
	}
}

export default createRoom