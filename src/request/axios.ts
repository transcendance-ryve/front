import axios, { type AxiosResponse } from 'axios'
import { ref, type Ref } from 'vue'

axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

type Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get";

const	useAxios = async (method: Methods, url: string, data: string | any = null) => {
	const	response: Ref = ref(null)
	const	error: Ref = ref(null)
	const	loading: Ref = ref(true)

	try {
		const	res:AxiosResponse = await axios[method](url, data ? JSON.parse(data) : '')
		response.value = res.data
	}
	catch (err: any) {
		error.value = err
	}
	finally {
		loading.value = false
	}

	return { response, error, loading };
}

export default useAxios