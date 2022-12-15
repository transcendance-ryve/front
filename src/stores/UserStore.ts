import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '../router/index'

export const useUserStore = defineStore('userStore', () => {

	const	user = ref(
		{
			"userName": "Vintran",
			"rank": 1,
			"level": 199,
			"levelProgression": 70,
			"stats": {
				"rankingPoints": 21539,
				"playCount": 304,
				"ratio": 4.8,
				"wins": 290,
				"defeats": 14
			}
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