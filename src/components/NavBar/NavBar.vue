<script setup lang="ts">

	import { ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import { useProfileStore } from '../../stores/ProfileStore'
	import router from '../../router/index'
	import { logoRyve } from '../../assets/logoSVG'
	import NavBarSectionSelector from './NavBarSectionSelector.vue'
	import UserInfos from '../Utils/UserInfos.vue'

	const	contentStore = useContentStore()
	const	userStore = useUserStore()
	const	profileStore = useProfileStore()

	const	profileRedirect = () => {
		profileStore.setProfile(userStore.user, 1)
		contentStore.state = 4
	}

	const	profilePath = '/profile/' + userStore.user.userName

	let		userInfoXS = ref(false)

	const	manageResponsive = () => {
		if (window.innerWidth <= 1200)
			userInfoXS.value = true
		else if (contentStore.navBarListOpen)
			contentStore.navBarListOpen = false
		window.addEventListener('resize', () => {
			if (window.innerWidth <= 1200)
				userInfoXS.value = true
			else
				userInfoXS.value = false
			if (window.innerWidth > 840 && contentStore.navBarListOpen)
				contentStore.navBarListOpen = false
		})
	}
	manageResponsive()
	// if (window.innerWidth <= 1200)
	// 		userInfoXS.value = true
	// window.addEventListener('resize', () => {
	// 	if (window.innerWidth <= 1200)
	// 		userInfoXS.value = true
	// 	else
	// 		userInfoXS.value = false	
	// })

</script>

<template>

	<div class="NavBar-wrapper">
		<div class="NavBar">
			<img
				class="NavBarList-logo"
				src="../../assets/list.svg"
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
					:responsive="false"
					:sizeXS="userInfoXS"
				>
				<div class="User-optionsWrap">
					<RouterLink
					class="User-options"
						:to="profilePath"
						@click="profileRedirect()"
					>
						Profile
					</RouterLink>
					<button class="User-options">Settings</button>
					<button class="User-options" @click="$emit('disconnect')">Disconnect</button>
				</div>
				</UserInfos>
			</div>
		</div>
		<div class="NavBarList-options" v-if="contentStore.navBarListOpen">
			<NavBarSectionSelector/>
		</div>
	</div>

</template>
