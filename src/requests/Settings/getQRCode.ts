import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getQRCode = async (dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/auth/tfa/qrcode'
	)
	if (error.value) {
		//	handle errors
		dataState.error = error.value
	}
	else if (response.value) {
		dataState.loading = loading.value
		// console.log(response.value)
		return response.value
	}
}

export default getQRCode