import useAxios from '@/requests/useAxios'
import type { DataForm } from '@/components/SideBar/SideBarNewChan.vue'

export interface Form {
    id: string,
	name: string
	status: string,
	avatar: null,
	avatarFile: File | null,
	password: string
}

const editChannel = async (form: Partial<Form>) => {

	let	formData = new FormData()
	formData.set('image', form.avatarFile as File);

	const { response, loading, error } = await useAxios(
		'put',
		'/channels/editRoom',
		{
			editInfo: {
                channelId: form.id,
				name: form.name,
				status: form.status,
				password: form.password,
			},
			image: formData.get('image')
		},
		{ headers: { 'content-Type': 'multipart/form-data;' } }
	)
	if (error.value) {
		//	handle errors
	}
	else if (response.value) {
		//	handle succes
		// console.log(response.value)
	}
}

export default editChannel