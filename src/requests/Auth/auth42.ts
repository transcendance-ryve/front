import useAxios from '@/requests/useAxios'
import router from '@/router'

const auth42 = async () => {

	const { response, loading, error } = await useAxios(
		'get',
		'/auth/42'
	)
}

export default auth42