<script setup lang="ts">

	import { useUserStore } from '../stores/UserStore'
	import { RouterView } from 'vue-router'
	import NavBar from '../components/NavBar/NavBar.vue'
	import SideBar from '../components/SideBar/SideBar.vue'
	
	// const	userStore = useUserStore()

</script>

<template>
	<div class="Home">
	<!-- <div class="Home" v-if="userStore.loginApi"> -->
		<NavBar />
		<main class="BodyLayout">
			<section class="BodyLayout-mainContent">
				<RouterView />
			</section>
			<SideBar />
		</main>
	</div>

</template>