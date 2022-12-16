<script setup lang="ts">

	import { computed } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import SwitchBtn from './SwitchBtn.vue'
	import {
		logoList,
		logoFriends,
		logoAdd,
		logoPlay,
		logoChannels
		} from '../../assets/logoSVG'

	const	sbStore = useSideBarStore()

	const	update2ndOption = (newVal: number) => {
		if (sbStore.section == 1)
			sbStore.friendsState = newVal
		else if (sbStore.section == 2)
			sbStore.channelsState = newVal
		else
			sbStore.notifsState = newVal
	}

	const	btn1 = computed(() => {
		if (sbStore.section == 1)
			return 'Friends list'
		else if (sbStore.section == 2)
			return 'Channels list'
		else
			return 'Game'
	})

	const	btn2 = computed(() => {
		if (sbStore.section == 1)
			return 'Add friends'
		else if (sbStore.section == 2)
			return 'Join'
		else
			return 'Friends'
	})

	const	isSelected = (btn: number) => {
		if ((sbStore.section == 1 && sbStore.friendsState == btn) ||
				(sbStore.section == 2 && sbStore.channelsState == btn) ||
				(sbStore.section == 3 && sbStore.notifsState == btn))
			return true
		return false
	}

	const	getLogo = (btn: number) => {
		if ((sbStore.section == 1 || sbStore.section == 2) && btn == 1)
			return logoList
		else if ((sbStore.section == 1 || sbStore.section == 2) && btn == 2)
			return logoAdd
		else {
			if (btn == 1)
				return logoPlay
			else
				return logoFriends
		}
	}


</script>

<template>

	<div class="SideBar-switch">
		<SwitchBtn
			:value="btn1"
			:selected="isSelected(1)"
			:logo="getLogo(1)"
			@click="update2ndOption(1)"
		/>

		<SwitchBtn
			:value="btn2"
			:selected="isSelected(2)"
			:logo="getLogo(2)"
			@click="update2ndOption(2)"
		/>

		<SwitchBtn
			v-if="sbStore.section == 3"
			value="Channels"
			:selected="isSelected(3)"
			:logo="logoChannels"
			@click="update2ndOption(3)"
		/>
	</div>

</template>

<style lang="scss">

	.SideBar-switch {
		// width: 100%;
		display: flex;
	}

</style>