import useAxios from '@/requests/useAxios'
import type { CreateChanForm } from '@/types/Forms';

const createRoom = async (data: CreateChanForm) => {

	let	formData = new FormData()
	formData.set('image', data.avatarFile as File);

	await useAxios(
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
}

export default createRoom