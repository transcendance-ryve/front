import { createRouter, createWebHistory } from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '../views/Home.vue'
import Play from '../components/Play/Play.vue'
import Leaderboard from '../components/Leaderboard/Leaderboard.vue'
import Spectate from '../components/Spectate/Spectate.vue'
import Profile from '../components/Profile/Profile.vue'
// import Login from '../views/Login.vue'

// const router = createRouter({
// 	history: createWebHistory(import.meta.env.BASE_URL),
// 	routes: [
// 		{
// 			path: '/',
// 			alias: ['/home'],
// 			name: 'home',
// 			component: Home,
// 			children: [
// 				{
// 					path: 'play',
// 					name: 'play',
// 					alias: ['/', '/home'],
// 					component: Play,
// 				},
// 				{
// 					path: 'leaderboard',
// 					name: 'leaderboard',
// 					component: Leaderboard,
// 				},
// 				{
// 					path: 'spectate',
// 					name: 'spectate',
// 					component: Spectate,
// 				},
// 				{
// 					path: 'profile',
// 					name: 'profile',
// 					component: Profile,
// 				}
// 			]
// 		},
// 		{
// 			path: '/login',
// 			name: 'login',
// 			component: Login,
// 		}
// 		// {
// 		// 	path: '/about',
// 		// 	name: 'about',
// 		// 	// route level code-splitting
// 		// 	// this generates a separate chunk (About.[hash].js) for this route
// 		// 	// which is lazy-loaded when the route is visited.
// 		// 	component: () => import('../views/About.vue')
// 		// }
// 	]
// })

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			// alias: ['/home'],
			name: 'home',
			component: Home,
			// beforeEnter: (to, from, next) => {
			// 	console.log(to, from)
			// 	next($cookies.isKey('jwtToken'))
			// },
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

export default router