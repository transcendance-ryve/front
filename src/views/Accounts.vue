<script setup lang="ts">

	import router from '@/router/index'
	import register from '@/requests/Auth/register'
	import login from '@/requests/Auth/login'
	import tfaCallback from '@/requests/Auth/tfaCallback'

	const	loginRedirect = () => router.push({path:'/accounts/login'})

</script>

<template>

	<div class="Accounts">
		<RouterView
			@register="register"
			@login="login"
			@tfaCode="tfaCallback"
		/>
		<div class="Login-redirect" v-if="router.currentRoute.value.name === 'register'">
			<span>Already have an account ?</span>
			<button @click="loginRedirect()">Login here</button>
		</div>
	</div>
		
</template>