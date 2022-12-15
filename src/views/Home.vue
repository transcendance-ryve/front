<script setup lang="ts">

	import { useUserStore } from '../stores/UserStore'
	import { useNavBarStore } from '../stores/NavBarStore'
	import { RouterView } from 'vue-router'
	import NavBar from '../components/NavBar/NavBar.vue'
	import SideBar from '../components/SideBar/SideBar.vue'
	import router from '../router/index'
	
	const	userStore = useUserStore()
	userStore.checkConnection()

	const	nbStore = useNavBarStore()

	
</script>

<template>

	<NavBar @disconnect="userStore.disconnect()"/>
	<main class="BodyLayout">
		<section class="BodyLayout-mainContent">
			<RouterView />
		</section>
		<SideBar />
	</main>
	<!-- <footer class="SiteFooter">FOOTER</footer> -->

</template>