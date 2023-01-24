<script setup lang="ts">

	import { onMounted, onUnmounted } from 'vue'
	import { useSidebarStore } from '@/stores/SidebarStore'
	import { useUserStore } from '@/stores/UserStore'
	import SidebarContent from './SidebarContent.vue'
	import SidebarConv from './SidebarConv.vue'
	import SidebarNewChan from './SidebarNewChan.vue'
	import { logoFriends, logoChannels, logoNotifs } from '../../assets/logoSVG'
	import type { SocketEvent } from '@/types/Socket'
	import router from '@/router'

	const	sbStore = useSidebarStore()
	const	socket = useUserStore().socket
	const	listeners: SocketEvent[] = [
		{ name: 'private_game_request', callback: () => sbStore.increaseNotif('game') },
		{ name: 'game_request_timeup', callback: () => sbStore.decreaseNotif('game') },
		{ name: 'game_request_decline', callback: () => sbStore.decreaseNotif('game') },
		{ name: 'game_request_accept', callback: () => sbStore.decreaseNotif('game') },
		{ name: 'game_request_accepted', callback: () => router.push({ path: '/play' }) },
		{ name: 'friend_request', callback: () => sbStore.increaseNotif('friend') },
		{ name: 'friend_accepted_submitted', callback: () => sbStore.decreaseNotif('friend') },
		{ name: 'friend_declined_submitted', callback: () => sbStore.decreaseNotif('friend') },
		{ name: 'chanInvitationReceived', callback: () => sbStore.increaseNotif('channel') },
		{ name: 'chanInvitationDeleted', callback: () => sbStore.decreaseNotif('channel') },
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
		<div class="Sidebar-sectionsBtns">
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected': sbStore.state.section === 1 && sbStore.conv.open !== true }"
				@click="sbStore.updateSection(1)"
			>
				<span class="SectionsBtns-Logo" v-html="logoFriends"></span>
				<span class="SectionsBtns-value">Friends</span>
			</button>
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected':
					sbStore.state.section === 2 &&
					sbStore.newChan === false &&
					sbStore.conv.open !== true
				}"
				@click="sbStore.updateSection(2)"
			>
				<span class="SectionsBtns-Logo" v-html="logoChannels"></span>
				<span class="SectionsBtns-value">Channels</span>
			</button>
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected': sbStore.state.section === 3 }"
				@click="sbStore.updateSection(3)"
			>
				<span class="SectionsBtns-Logo" :class="{'Notif-active': sbStore.notifActive}" v-html="logoNotifs"></span>
			</button>
		</div>

		<SidebarConv v-if="sbStore.conv.open === true" />
		<SidebarNewChan v-else-if="sbStore.newChan === true" />
		<SidebarContent v-else />
	</section>

</template>
