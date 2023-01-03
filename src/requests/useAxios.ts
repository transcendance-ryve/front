import axios, { type AxiosResponse } from 'axios'
import { ref, type Ref } from 'vue'
import router from '../router/index'
import { useUserStore } from '../stores/UserStore'


axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.withCredentials = true

type	Methods = "head" | "options" | "put" | "post" | "patch" | "delete" | "get"
type	useAxiosRes = { reponse: Ref<any>, error: Ref<any>, loading: Ref<boolean> }

const	useAxios = async (method: Methods, url: string, body: object | any = null, header: object | any = null) => {
	const	response: Ref<any> = ref(null)
	const	error: Ref<any> = ref(null)
	const	loading: Ref<boolean> = ref(true)

	try {
		const	res:AxiosResponse = await axios[method](url, body ? body : '', header ? header : '')
		response.value = res.data
	}
	catch (err: any) {
		console.log('error', err)
		if (err.response?.status === 401) {
			const	userStore = useUserStore()
			localStorage.clear()
			userStore.me = ''
			userStore.loginApi = false
			if (!router.currentRoute.value.fullPath.includes('/accounts'))
				router.push({ path: '/accounts' })
		}
		error.value = err
	}
	finally {
		loading.value = false
	}

	return { response, error, loading }
}

export default useAxios