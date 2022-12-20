<script setup lang="ts">

	import { ref } from 'vue'
	import RegisterForm from '../components/Login/RegisterForm.vue'
	import LoginForm from '../components/Login/LoginForm.vue'
	import { useUserStore } from '../stores/UserStore'
	import router from '../router/index'

	const	formType = ref('register')

	const	userStore = useUserStore()

	if (userStore.checkConnection())
		router.push({path:'/'})

	const registerSuccess = (userName: string, email: string, password: string) => {
		console.log(userName, email, password)
		userStore.connect()
	}

	const loginSuccess = (id: string, password: string) => {
		console.log(id, password)
		userStore.connect()
	}

</script>

<template>

	<div class="Login">
		<RegisterForm
			v-if="formType == 'register'"
			@success="registerSuccess"
		/>
		<div class="Login-redirect" v-if="formType == 'register'">
			<span>Already have an account ?</span>
			<button @click="formType = 'login'">Login here</button>
		</div>
		<LoginForm
			v-if="formType == 'login'"
			@success="loginSuccess"
		/>
	</div>
		
</template>