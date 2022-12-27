import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../components/Play/Play.vue'
import Leaderboard from '../components/Leaderboard/Leaderboard.vue'
import Spectate from '../components/Spectate/Spectate.vue'
import Profile from '../components/Profile/Profile.vue'
import Accounts from '../views/Accounts.vue'
import RegisterForm from '../components/Forms/RegisterForm.vue'
import LoginForm from '../components/Forms/LoginForm.vue'
import ForgotForm from '../components/Forms/ForgotForm.vue'
import { useUserStore } from '../stores/UserStore'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			children: [
				{
					path: 'play',
					name: 'play',
					alias: ['/'],
					component: Play,
				},
				{
					path: 'leaderboard',
					name: 'leaderboard',
					component: Leaderboard,
				},
				{
					path: 'spectate',
					name: 'spectate',
					component: Spectate,
				},
				{
					path: 'profile/:id',
					name: 'profile',
					component: Profile,
				}
			]
		},
		{
			path: '/accounts',
			name: 'accounts',
			component: Accounts,
			children: [
				{
					path: '/accounts',
					alias: ['register'],
					name: 'register',
					component: RegisterForm,
				},
				{
					path: 'login',
					name: 'login',
					component: LoginForm,
				},
				{
					path: 'forgot-password',
					name: 'forgot-password',
					component: ForgotForm,
				},
			]
		}
		// {
		// 	path: '/',
		// 	name: 'login',
		// 	component: Login,
			// beforeEnter: (to, from, next) => {
			// 	console.log(to, from)
			// 	next(!$cookies.isKey('jwtToken'))
			// },
		// }
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (About.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import('../views/About.vue')
		// }
	]
})

router.beforeEach(async (to, from) => {
	// console.log('1', from.fullPath, to.fullPath)
	// if ((!from.fullPath.includes('/accounts') && to.fullPath.includes('/accounts'))
	// || (from.fullPath.includes('/accounts') && !to.fullPath.includes('/accounts'))
	// || (from.fullPath == '/' && to.fullPath == '/')) {
	// 	console.log('2', from.fullPath, to.fullPath)
	// 	const	userStore = useUserStore()
	// 	userStore.updateLoginApi()
	// }
	const	userStore = useUserStore()
	// if (from.fullPath.includes('/accounts') && !to.fullPath.includes('/accounts'))
	// 	next(userStore.loginApi ? true : false)
	// else if (!from.fullPath.includes('/accounts') && to.fullPath.includes('/accounts'))
	// 	next(userStore.loginApi ? false : true)
	// else
	// 	next()
	if (!userStore.loginApi && !to.fullPath.includes('/accounts'))
		return { name: 'accounts' }
	else if (userStore.loginApi && to.fullPath.includes('/accounts'))
		return { name: 'home' }
})

export default router