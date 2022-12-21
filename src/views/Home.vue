<script setup lang="ts">

	import { useUserStore } from '../stores/UserStore'
	import { useContentStore } from '../stores/ContentStore'
	import { RouterView } from 'vue-router'
	import NavBar from '../components/NavBar/NavBar.vue'
	import SideBar from '../components/SideBar/SideBar.vue'
	import Profile from '../components/Profile/Profile.vue'
	import router from '../router/index'
	
	const	userStore = useUserStore()
	userStore.checkConnection()

	const	contentStore = useContentStore()

	
</script>

<template>

	<!-- <NavBar @disconnect="userStore.disconnect()"/> -->
	<NavBar />
	<main
		class="BodyLayout"
		:class="{'BodyLayout--NavBarListOpen': contentStore.navBarListOpen}"
	>
		<section class="BodyLayout-mainContent">
			<!-- <Profile v-if="contentStore.state == 5" /> -->
			<!-- <RouterView v-else /> -->
			<RouterView/>
		</section>
		<SideBar />
	</main>
	<!-- <footer class="SiteFooter">FOOTER</footer> -->

</template>