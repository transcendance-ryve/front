<script setup lang="ts">

	import { ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import { useProfileStore } from '../../stores/ProfileStore'
	import router from '../../router/index'
	import { logoRyve, logoPlay, logoLeaderboard, logoSpectate } from '../../assets/logoSVG'
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
	if (window.innerWidth <= 1200)
			userInfoXS.value = true
	window.addEventListener('resize', () => {
		if (window.innerWidth <= 1200)
			userInfoXS.value = true
		else
			userInfoXS.value = false	
	})

</script>

<template>

	<div class="NavBar">
		<img class="NavBar-list" src="../../assets/list.svg" alt="list">
		<span class="NavBar-logo" v-html="logoRyve"></span>
		<div class="NavBar-content">
			<div class="NavBar-options">
				<RouterLink
					to="/play"
					class="Options-link"
					:class="{'Link--selected': contentStore.state == 1}"
					@click="contentStore.state = 1"
				>
					<span class="Link-logo" v-html="logoPlay"></span>
					Play
				</RouterLink>
				<RouterLink
					to="/leaderboard"
					class="Options-link"
					:class="{'Link--selected': contentStore.state == 2}"
					@click="contentStore.state = 2"
				>
					<span class="Link-logo" v-html="logoLeaderboard"></span>
					Leaderboard
				</RouterLink>
				<RouterLink
					to="/spectate"
					class="Options-link"
					:class="{'Link--selected': contentStore.state == 3}"
					@click="contentStore.state = 3"
				>
					<span class="Link-logo" v-html="logoSpectate"></span>
					Spectate
				</RouterLink>
			</div>

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
					<!-- <button>Profile</button> -->
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

</template>
