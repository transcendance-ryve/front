<script setup lang="ts">

	import { useUserStore } from '@/stores/UserStore'
	import router from '@/router/index'
	import register from '@/requests/Auth/register'
	import login from '@/requests/Auth/login'
	import forgotPassword from '@/requests/Auth/forgotPassword'
	import tfaCallback from '@/requests/Auth/tfaCallback'

	const	loginRedirect = () => {
		router.push({path:'/accounts/login'})
	}

	const	resetPassword = (password: string) => {
		// console.log(password)
	}

</script>

<template>

	<div class="Accounts">
		<RouterView
			@register="register"
			@login="login"
			@forgotPassword="forgotPassword"
			@resetPassword="resetPassword"
			@tfaCode="tfaCallback"
		/>
		<div class="Login-redirect" v-if="router.currentRoute.value.name === 'register'">
			<span>Already have an account ?</span>
			<button @click="loginRedirect()">Login here</button>
		</div>
	</div>
		
</template>