<script setup lang="ts">

	import { useContentStore } from '../../stores/ContentStore'
	import { logoPlay, logoLeaderboard, logoSpectate } from '../../assets/logoSVG'

	const	contentStore = useContentStore()

	const	updateState = (value: number) => {
		contentStore.state = value
		if (contentStore.navbarListOpen)
			contentStore.navbarListOpen = false
	}

</script>

<template>

	<div class="NavbarSectionSelector">
		<RouterLink
			to="/play"
			class="Options-link"
			:class="{'Link--selected': contentStore.state === 1}"
			@click="updateState(1)"
		>
			<span class="Link-logo" v-html="logoPlay"></span>
			<span class="Link-value">Play</span>
		</RouterLink>
		<RouterLink
			to="/leaderboard"
			class="Options-link"
			:class="{'Link--selected': contentStore.state === 2}"
			@click="updateState(2)"
		>
			<span class="Link-logo" v-html="logoLeaderboard"></span>
			<span class="Link-value">Leaderboard</span>
		</RouterLink>
		<RouterLink
			to="/spectate"
			class="Options-link"
			:class="{'Link--selected': contentStore.state === 3}"
			@click="updateState(3)"
		>
			<span class="Link-logo" v-html="logoSpectate"></span>
			<span class="Link-value">Spectate</span>
		</RouterLink>
	</div>

</template>
