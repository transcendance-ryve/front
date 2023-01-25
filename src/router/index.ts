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
import TfaForm from '../components/Forms/TfaForm.vue'
import NotFound from '../views/NotFound.vue'
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
					beforeEnter: (to) => {
						if (to.fullPath === '/leaderboard')
							return {
								path: '/leaderboard',
								query: { page: 1, take: 10, sort: 'rank_point', order: 'desc' }
							}
					}
				},
				{
					path: 'spectate',
					name: 'spectate',
					component: Spectate,
					beforeEnter: (to) => {
						if (Object.keys(to.query).length === 0)
							return {
								path: to.fullPath,
								query: { order: 'desc' }
							}
					}
				},
				{
					path: 'profile/:id',
					name: 'profile',
					component: Profile,
					beforeEnter: (to) => {
						if (Object.keys(to.query).length === 0)
							return {
								path: to.fullPath,
								query: { page: 1, take: 10, order: 'desc' }
						}
					}
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
						if (to.query.code)
							await callBack(to.query.code as string)
					},
				},
				{
					path: 'login/tfa',
					name: 'tfa',
					component: TfaForm,
				}
			]
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'not-found',
			component: NotFound,
		}
	]
})

router.beforeEach(async (to, from) => {
	const	userStore = useUserStore()

	if (!to.fullPath.includes('/accounts') && !userStore.loginApi
		&& !to.fullPath.includes('/accounts/login/tfa'))
		return { name: 'register' }
	else if (to.fullPath.includes('/accounts') && userStore.loginApi)
		return { path: '/' }
})

export const profileRedirect = (id: string) => {
	if (id)
		router.push({ name: 'profile', params: { id }, query: { page: 1, take: 10, order: 'desc' } })
}

export default router