<script setup lang="ts">

	import { useNavBarStore } from '../../stores/NavBarStore'
	import router from '../../router/index'
	import { logoRyve, logoPlay, logoLeaderboard, logoSpectate } from '../../assets/logoSVG'
	import UserInfos from '../Utils/UserInfos.vue'

	const	nbStore = useNavBarStore()

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
					:class="{'Link--selected': nbStore.nbState == 1}"
					@click="nbStore.nbState = 1"
				>
					<span class="Link-logo" v-html="logoPlay"></span>
					Play
				</RouterLink>
				<RouterLink
					to="/leaderboard"
					class="Options-link"
					:class="{'Link--selected': nbStore.nbState == 2}"
					@click="nbStore.nbState = 2"
				>
					<span class="Link-logo" v-html="logoLeaderboard"></span>
					Leaderboard
				</RouterLink>
				<RouterLink
					to="/spectate"
					class="Options-link"
					:class="{'Link--selected': nbStore.nbState == 3}"
					@click="nbStore.nbState = 3"
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
			>
				<div class="User-optionsWrap">
					<!-- <button>Profile</button> -->
					<RouterLink
					class="User-options"
						to="/profile"
						@click="nbStore.nbState = 0"
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
