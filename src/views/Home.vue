<script setup lang="ts">

	import { useUserStore } from '../stores/UserStore'
	import { RouterView } from 'vue-router'
	import NavBar from '../components/NavBar/NavBar.vue'
	import SideBar from '../components/SideBar/SideBar.vue'
	import Notifications from '@/components/Notifications/Notifications.vue'
	
	// const	userStore = useUserStore()

</script>

<template>
	<div class="Home">
		<NavBar />
		<main class="BodyLayout">
			<section class="BodyLayout-mainContent">
				<RouterView />
			</section>
			<SideBar />
			<Notifications />
		</main>
	</div>

</template>