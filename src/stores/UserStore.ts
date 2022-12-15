import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'

export const useUserStore = defineStore('userStore', () => {

	const	user = ref(
		{
			userName: 'Vintran',
			level: 199,
			levelPerCent: 70
		}
	)

	// sessionStorage or localStorage ?
	function    checkConnection() {
		const login = localStorage.getItem('login') || false
		if (login == 'false' || login == false) {
			router.push({path:'/login'})
			return false
		}
		return true
	}

	function	connect() {
		localStorage.setItem('login', 'true')
		router.push({path:'/'})
	}

	function	disconnect() {
		localStorage.setItem('login', 'false')
		router.push({path:'/login'})
	}

	return {
		user,
		checkConnection,
		connect,
		disconnect
	}
})