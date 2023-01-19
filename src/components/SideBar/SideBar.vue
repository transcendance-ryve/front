<script setup lang="ts">

	import { onMounted, onUnmounted } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import { useUserStore } from '@/stores/UserStore'
	import SideBarContent from './SideBarContent.vue'
	import SideBarConv from './SideBarConv.vue'
	import SideBarNewChan from './SideBarNewChan.vue'
	import { logoFriends, logoChannels, logoNotifs } from '../../assets/logoSVG'
	import type { SocketEvent } from '@/types/Socket'

	const	sbStore = useSideBarStore()
	const	socket = useUserStore().socket
	const	listeners: SocketEvent[] = [
		{ name: 'private_game_request', callback: () => sbStore.notifications.game++ },
		{ name: 'friend_request', callback: () => sbStore.notifications.friend++ },
		{ name: 'friend_accepted_submitted', callback: () => sbStore.notifications.friend-- },
		{ name: 'friend_declined_submitted', callback: () => sbStore.notifications.friend-- },
		{ name: 'chanInvitationReceived', callback: () => sbStore.notifications.channel++ },
		{ name: 'chanInvitationDeleted', callback: () => sbStore.notifications.channel-- },
	]

	onMounted(() => {
		listeners.forEach(listener => socket.on(listener.name, listener.callback))
	})

	onUnmounted(() => {
		listeners.forEach(listener => socket.off(listener.name, listener.callback))
	})

</script>

<template>

	<section class="BodyLayout-sidebar">
		<div class="SideBar-sectionsBtns">
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected': sbStore.state.section == 1 && sbStore.conv.open != true }"
				@click="sbStore.updateSection(1)"
			>
				<span class="SectionsBtns-Logo" v-html="logoFriends"></span>
				<span class="SectionsBtns-value">Friends</span>
			</button>
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected':
					sbStore.state.section == 2 &&
					sbStore.newChan == false &&
					sbStore.conv.open != true
				}"
				@click="sbStore.updateSection(2)"
			>
				<span class="SectionsBtns-Logo" v-html="logoChannels"></span>
				<span class="SectionsBtns-value">Channels</span>
			</button>
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected': sbStore.state.section == 3 }"
				@click="sbStore.updateSection(3)"
			>
				<span class="SectionsBtns-Logo" :class="{'Notif-active': sbStore.notifActive}" v-html="logoNotifs"></span>
			</button>
		</div>

		<SideBarConv v-if="sbStore.conv.open == true" />
		<SideBarNewChan v-else-if="sbStore.newChan == true" />
		<SideBarContent v-else />
	</section>

</template>
