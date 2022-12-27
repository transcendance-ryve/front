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
	// userStore.updateLoginApi()

	const	register = async (username: string, email: string, password: string) => {
		// console.log(userName, email, password)
		// userStore.connect()
		// const	res = await axios.post('http://localhost:3000/auth/register', {
		// 	username,
		// 	email,
		// 	password
		// }, { withCredentials: true })
		// console.log(res)
		// console.log('cookie = ', $cookies.get('jwtToken'))
		// console.log($cookies.keys())
		userStore.register(username, email, password)
	}

	const	login = (id: string, password: string) => {
		console.log(id, password)
		userStore.connect(id, password)
	}

	const	forgotPassword = (email: string) => {
		console.log(email)
		userStore.forgotPassword(email)
	}

	const	resetPassword = (password: string) => {
		console.log(password)
	}

</script>

<template>

	<div class="Accounts">
		<!-- <RegisterForm
			v-if="formType == 'register'"
			@success="registerSuccess"
		/> -->
		<RouterView
			@register="register"
			@login="login"
			@forgotPassword="forgotPassword"
			@resetPassword="resetPassword"
		/>
		<div class="Login-redirect" v-if="formType == 'register'">
			<span>Already have an account ?</span>
			<button @click="loginRedirect()">Login here</button>
		</div>
		<!-- <div class="Login-redirect" v-if="formType == 'register'">
			<span>Already have an account ?</span>
			<button @click="formType = 'login'">Login here</button>
		</div> -->
		<!-- <LoginForm
			v-if="formType == 'login'"
			@forgot="formType = 'forgot'"
			@success="loginSuccess"
		/> -->
		<!-- <ForgotForm
			v-if="formType == 'forgot'"
			@success="forgotSuccess"
		/> -->
		<!-- <ResetPassForm
			@success="resetSuccess"
		/> -->
	</div>
		
</template>