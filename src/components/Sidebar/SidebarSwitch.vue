<script setup lang="ts">

	import { computed } from 'vue'
	import { useSidebarStore } from '../../stores/SidebarStore'
	import SwitchBtn from './SwitchBtn.vue'
	import {
		logoList,
		logoFriends,
		logoAdd,
		logoPlay,
		logoChannels
		} from '../../assets/logoSVG'

	const	sbStore = useSidebarStore()

	const	updateState = (newVal: number) => {
		if (sbStore.state.section === 1)
			sbStore.state.friendsState = newVal
		else if (sbStore.state.section === 2)
			sbStore.state.channelsState = newVal
		else
			sbStore.state.notifsState = newVal
	}

	const	btn1 = computed(() => {
		if (sbStore.state.section === 1)
			return 'Friends list'
		else if (sbStore.state.section === 2)
			return 'Channels list'
		else
			return 'Games'
	})

	const	btn2 = computed(() => {
		if (sbStore.state.section === 1)
			return 'Add friends'
		else if (sbStore.state.section === 2)
			return 'Join'
		else
			return 'Friends'
	})

	const	isSelected = (btn: number) => {
		if ((sbStore.state.section === 1 && sbStore.state.friendsState === btn) ||
				(sbStore.state.section === 2 && sbStore.state.channelsState === btn) ||
				(sbStore.state.section === 3 && sbStore.state.notifsState === btn))
			return true
		return false
	}

	const	getLogo = (btn: number) => {
		if ((sbStore.state.section === 1 || sbStore.state.section === 2) && btn === 1)
			return logoList
		else if ((sbStore.state.section === 1 || sbStore.state.section === 2) && btn === 2)
			return logoAdd
		else {
			if (btn === 1)
				return logoPlay
			else
				return logoFriends
		}
	}


</script>

<template>

	<div class="Sidebar-switch">
		<SwitchBtn
			:value="btn1"
			:selected="isSelected(1)"
			:logo="getLogo(1)"
			@click="updateState(1)"
		/>

		<SwitchBtn
			:value="btn2"
			:selected="isSelected(2)"
			:logo="getLogo(2)"
			@click="updateState(2)"
		/>

		<SwitchBtn
			v-if="sbStore.state.section == 3"
			value="Channels"
			:selected="isSelected(3)"
			:logo="logoChannels"
			@click="updateState(3)"
		/>
	</div>

</template>

<style lang="scss">

	.Sidebar-switch {
		display: flex;
	}

</style>