<script setup lang="ts">

	import { useUserStore } from '../stores/UserStore'
	import { useContentStore } from '../stores/ContentStore'
	import { RouterView } from 'vue-router'
	import NavBar from '../components/NavBar/NavBar.vue'
	import SideBar from '../components/SideBar/SideBar.vue'
	import Profile from '../components/Profile/Profile.vue'
	import Login from './Login.vue'
	import router from '../router/index'
	
	const	userStore = useUserStore()
	userStore.updateLoginApi()

	const	contentStore = useContentStore()
	console.log('refresh')
</script>

<template>

	<div class="Home-content" v-if="userStore.loginApi">
		<NavBar />
		<main class="BodyLayout">
			<section class="BodyLayout-mainContent">
				<!-- <Profile v-if="contentStore.state == 5" /> -->
				<!-- <RouterView v-else /> -->
				<RouterView/>
			</section>
			<SideBar />
		</main>
	</div>
	<Login v-else/>

</template>