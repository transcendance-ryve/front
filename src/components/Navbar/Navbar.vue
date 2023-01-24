<script setup lang="ts">

	import { ref, type Ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import router from '../../router/index'
	import { logoRyve, logoNavbarList, logoNavbarCloseList } from '../../assets/logoSVG'
	import NavbarSectionSelector from './NavbarSectionSelector.vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import UserMenu from './UserMenu.vue'

	const	contentStore = useContentStore()
	const	userStore = useUserStore()
	let		userInfoXS: Ref<boolean> = ref(false)

	const	manageResponsive = () => {
		if (window.innerWidth <= 1440)
			userInfoXS.value = true
		else if (contentStore.navbarListOpen)
			contentStore.navbarListOpen = false
		window.addEventListener('resize', () => {
			if (window.innerWidth <= 1440)
				userInfoXS.value = true
			else
				userInfoXS.value = false
			if (window.innerWidth > 768 && contentStore.navbarListOpen)
				contentStore.navbarListOpen = false
		})
	}
	manageResponsive()

</script>

<template>

	<div class="Navbar-wrapper">
		<div class="Navbar">
			<span
				v-if="!contentStore.navbarListOpen"
				class="NavbarList-logo"
				v-html="logoNavbarList"
				@click="contentStore.navbarListOpen = !contentStore.navbarListOpen"
			></span>
			<span
				v-else
				class="NavbarList-logo"
				v-html="logoNavbarCloseList"
				@click="contentStore.navbarListOpen = !contentStore.navbarListOpen"
			></span>
			<span class="Navbar-logo" v-html="logoRyve" @click="router.push({ path:'/' })"></span>
			<div class="Navbar-content">
				<NavbarSectionSelector class="Content-options"/>
				<UserInfos
					:user="userStore.me"
					xpBackground="#242635"
					:reverse="true"
					:sizeXS="userInfoXS"
				>
					<UserMenu />
				</UserInfos>
			</div>
		</div>
		<div class="NavbarList-options" v-if="contentStore.navbarListOpen">
			<NavbarSectionSelector/>
		</div>
	</div>

</template>
