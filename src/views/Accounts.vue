<script setup lang="ts">

	import { ref } from 'vue'
	import RegisterForm from '@/components/Forms/RegisterForm.vue'
	import LoginForm from '@/components/Forms/LoginForm.vue'
	import ForgotForm from '@/components/Forms/ForgotForm.vue'
	import ResetPassForm from '@/components/Forms/ResetPassForm.vue'
	import { useUserStore } from '@/stores/UserStore'
	import router from '@/router/index'
	import axios from 'axios'

	const	formType = ref('register')

	const	loginRedirect = () => {
		formType.value = 'login'
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