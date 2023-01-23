import useAxios from '@/requests/useAxios'
import type { EditChanForm } from '@/types/Forms';

const editChannel = async (form: Partial<EditChanForm>) => {

	let	formData = new FormData()
	formData.set('image', form.avatarFile as File);

	await useAxios(
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
}

export default editChannel