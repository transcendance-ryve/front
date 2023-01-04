import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Play from '../components/Play/Play.vue'
import Leaderboard from '../components/Leaderboard/Leaderboard.vue'
import Spectate from '../components/Spectate/Spectate.vue'
import Profile from '../components/Profile/Profile.vue'
import Settings from '../components/Settings/Settings.vue'
import Accounts from '../views/Accounts.vue'
import RegisterForm from '../components/Forms/RegisterForm.vue'
import LoginForm from '../components/Forms/LoginForm.vue'
import ForgotForm from '../components/Forms/ForgotForm.vue'
import { useUserStore } from '../stores/UserStore'
import { callBack } from '@/requests/Auth/auth42'

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
				},
				{
					path: 'settings',
					name: 'settings',
					component: Settings,
				}
			]
		},
		{
			path: '/accounts',
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
					beforeEnter: async (to) => {
						console.log('peoijfw')
						if (to.query.code) {
							console.log('in if')
							await callBack(to.query.code as string)
						}
					},
				},
				{
					path: 'forgot-password',
					name: 'forgot-password',
					component: ForgotForm,
				},
			]
		}
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
	const	userStore = useUserStore()

	if (!userStore.loginApi && !to.fullPath.includes('/accounts'))
		return { name: 'register' }
	else if (userStore.loginApi && to.fullPath.includes('/accounts'))
		return { name: 'home' }
	else if (to.fullPath === '/leaderboard')
		return { path: '/leaderboard', query: { page: 1, take: 10, sort: 'rankPoint', order: 'des' } }
})

export default router