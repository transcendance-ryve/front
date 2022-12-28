<script setup lang="ts">

	import { useUserStore } from '@/stores/UserStore'
	import router from '@/router/index'

	console.log(router.currentRoute.value.fullPath)

	const	loginRedirect = () => {
		router.push({path:'/accounts/login'})
	}

	const	userStore = useUserStore()

	const	register = (username: string, email: string, password: string) => {
		userStore.register(username, email, password)
	}

	const	login = (id: string, password: string) => {
		userStore.connect(id, password)
	}

	const	forgotPassword = (email: string) => {
		userStore.forgotPassword(email)
	}

	const	resetPassword = (password: string) => {
		console.log(password)
	}

</script>

<template>

	<div class="Accounts">
		<RouterView
			@register="register"
			@login="login"
			@forgotPassword="forgotPassword"
			@resetPassword="resetPassword"
		/>
		<div class="Login-redirect" v-if="router.currentRoute.value.name == 'register'">
			<span>Already have an account ?</span>
			<button @click="loginRedirect()">Login here</button>
		</div>
	</div>
		
</template>