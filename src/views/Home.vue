<template>
	<div class="Home" v-if="userStore.loginApi">
		<Navbar />
		<main class="BodyLayout">
			<section class="BodyLayout-mainContent">
				<RouterView />
			</section>
			<Sidebar />
		</main>
	</div>

</template>

<script setup lang="ts">

	import { onMounted, onUnmounted } from 'vue'
	import { useUserStore } from '../stores/UserStore'
	import { useNotifStore } from '../stores/NotificationsStore'
	import { useSidebarStore } from '../stores/SidebarStore'
	import { RouterView } from 'vue-router'
	import router, { profileRedirect } from '@/router'
	import { onBeforeRouteLeave } from 'vue-router'
	import Navbar from '../components/Navbar/Navbar.vue'
	import Sidebar from '../components/Sidebar/Sidebar.vue'
	import getBlockRelation from '@/requests/Sidebar/Friends/getBlockRelation'
	import type { SocketEvent } from '@/types/Socket'
	import type { UserConnected } from '@/types/User'
	
	const	notifStore = useNotifStore()
	const	sbStore = useSidebarStore()
	const	userStore = useUserStore()
	userStore.connectSocket()
	const	socket = userStore.socket
	const	incomingMessageBreak: string[] = []

	const	listeners: SocketEvent[] = [
		{ name: 'updateUser', callback: (data: UserConnected) => userStore.updateMe(data) },
		{
			name: 'user_connected',
			callback: (res: any) => notifStore.addNotif('infoG', res.username, 'connected', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_accepted',
			callback: (res: any) => notifStore.addNotif('infoB', res.username, 'new friend', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_accepted_submitted',
			callback: (res: any) => notifStore.addNotif('infoB', res.username, 'new friend', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_request_submitted',
			callback: (res: any) => notifStore.addNotif('infoG', res.username, 'invitation sent', res.avatar)
		},
		{
			name: 'invitationAccepted',
			callback: () => notifStore.addNotif('infoG', '', 'invitation accepted')
		},
		{
			name: 'inviteToRoomSuccess',
			callback: (res: any) => notifStore.addNotif('infoG', res.username, 'invitation sent', res.avatar)
		},

		{
			name: 'user_disconnected',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'disconnected', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_declined',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'declined your invitation', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_removed',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'has deleted you', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_declined_submitted',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'invitation declined', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_removed_submitted',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'friend removed', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'invitationDeclined',
			callback: () => notifStore.addNotif('infoR', '', 'invitation declined')
		},
		{
			name: 'roomLeft',
			callback: () => notifStore.addNotif('infoR', '', 'channel leaved')
		},
		{
			name: 'banned',
			callback: (res: { name: string }) => { notifStore.addNotif('infoR', '', 'you have been banned from channel ' + res.name) }
		},

		{
			name: 'friend_request',
			callback: (res: any) => notifStore.addNotif('infoB', res.username, 'new friend invitation', res.avatar,
			() => {
				sbStore.updateSection(3)
				sbStore.state.notifsState = 2
			})
		},
		{
			name: 'chanInvitationReceived',
			callback: (res: any) => notifStore.addNotif('infoY', res.name, 'new channel invitation', res.avatar,
			() => {
				sbStore.updateSection(3)
				sbStore.state.notifsState = 3
			})
		},
		{
			name: 'roomCreated',
			callback: () => notifStore.addNotif('success', 'Success', 'Channel created')
		},
		{
			name: 'joinRoomSuccess',
			callback: () => notifStore.addNotif('success', 'Success', 'channel joined')
		},
		{
			name: "private_game_request",
			callback: (res: any) => {
				notifStore.addNotif('infoY', res.username, 'game request', res.avatar,
				() => {
					sbStore.updateSection(3)
					sbStore.state.notifsState = 1
				});
			}
		},
		{
			name: "game_request_declined",
			callback: (res: any) => {
				notifStore.addNotif('infoR', res.username, 'game request declined', res.avatar);
			}
		},
		{
			name: "game_request_accepted",
			callback: (res: any) => {
				if (window.location.pathname !== '/play')
					router.push({ path: '/play' });
				notifStore.addNotif('infoG', res.username, 'game request accepted', res.avatar);
			}
		},
		{
			name: 'user_blocked_submitted',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'is blocked', res.avatar)
		},
		{
			name: 'user_unblocked_submitted',
			callback: (res: any) => notifStore.addNotif('infoG', res.username, 'is unblocked', res.avatar)
		},
		{
			name: 'incomingMessage',
			callback: async (res: any, convId: string) => {
				if (userStore.me.id === res.sender.id || await getBlockRelation(res.sender.id) === 'targetBlocked')
					return
				const	convOpen = sbStore.conv.open
				if (res.channelName && ((convOpen && sbStore.conv.id !== convId) || !convOpen)) {
					if (!incomingMessageBreak.includes(convId)) {
						notifStore.addNotif('channelMessage', res.channelName, res.content, res.sender.avatar,
						() => sbStore.openConv('Channel', convId, false))
						incomingMessageBreak.push(convId)
						const	timeoutID = setTimeout(() => {
							incomingMessageBreak.splice(incomingMessageBreak.indexOf(convId), 1)
							clearTimeout(timeoutID)
						}, 5000)
					}
				}
				else if (!res.channelName && ((convOpen && sbStore.conv.id !== res.sender.id) || !convOpen))
					if (!incomingMessageBreak.includes(res.sender.id)) {
						notifStore.addNotif('privateMessage', res.sender.username, res.content, res.sender.avatar,
						() => sbStore.openConv('Friend', res.sender.id, false))
						incomingMessageBreak.push(res.sender.id)
						const	timeoutID = setTimeout(() => {
							incomingMessageBreak.splice(incomingMessageBreak.indexOf(res.sender.id), 1)
							clearTimeout(timeoutID)
						}, 5000)
					}
			}
		},
		{ name: 'accept_friend_failure', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'accept_decline_failure', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'friend_request_failure', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'friend_removed_failure', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'used_blocked_failure', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'used_unblocked_failure', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: "game_request_error", callback: (res: any) => notifStore.addNotif('error', 'Error', res) },
		{ name: 'acceptInvitationFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'messageRoomFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'inviteToRoomFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'createRoomFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'joinRoomFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'promoteUserFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'demoteUserFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'muteUserFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'unmuteUserFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'banUserFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },
		{ name: 'unbanUserFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) }
	]

	onBeforeRouteLeave((to, from, next) => {
		if (to.path.includes('/accounts') && userStore.loginApi)
			next(false)
		else
			next(true)
	})

	onMounted(() => {
		listeners.forEach(listener => socket.on(listener.name, listener.callback))
	})

	onUnmounted(() => {
		listeners.forEach(listener => socket.off(listener.name, listener.callback))
	})

</script>