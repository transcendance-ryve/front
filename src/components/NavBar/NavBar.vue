<script setup lang="ts">

	import { ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import router from '../../router/index' //
	import { logoRyve } from '../../assets/logoSVG'
	import NavBarSectionSelector from './NavBarSectionSelector.vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import UserMenu from './UserMenu.vue'

	const	contentStore = useContentStore()

	let		userInfoXS = ref(false)

	const	manageResponsive = () => {
		if (window.innerWidth <= 1440)
			userInfoXS.value = true
		else if (contentStore.navBarListOpen)
			contentStore.navBarListOpen = false
		window.addEventListener('resize', () => {
			if (window.innerWidth <= 1440)
				userInfoXS.value = true
			else
				userInfoXS.value = false
			if (window.innerWidth > 768 && contentStore.navBarListOpen)
				contentStore.navBarListOpen = false
		})
	}
	manageResponsive()

</script>

<template>

	<div class="NavBar-wrapper">
		<div class="NavBar">
			<img
				v-if="!contentStore.navBarListOpen"
				class="NavBarList-logo"
				src="../../assets/logoList.svg"
				alt="list"
				@click="contentStore.navBarListOpen = !contentStore.navBarListOpen"
			>
			<img
				v-else
				class="NavBarList-logo"
				src="../../assets/logoCross.svg"
				alt="list"
				@click="contentStore.navBarListOpen = !contentStore.navBarListOpen"
			>
			<span class="NavBar-logo" v-html="logoRyve"></span>
			<div class="NavBar-content">
				<NavBarSectionSelector class="Content-options"/>
				<UserInfos
					userName="Vintran"
					:level="199"
					:levelPerCent="70"
					perCentBackground="#242635"
					:reverse="true"
					:sizeXS="userInfoXS"
				>
				<UserMenu />
				</UserInfos>
			</div>
		</div>
		<div class="NavBarList-options" v-if="contentStore.navBarListOpen">
			<NavBarSectionSelector/>
		</div>
	</div>

</template>
