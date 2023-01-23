import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getQRCode = async (dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/auth/tfa/qrcode'
	)
	if (error.value)
		dataState.error = error.value
	else {
		dataState.loading = loading.value
		return response.value
	}
}

export default getQRCode