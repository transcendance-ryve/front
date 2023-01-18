<script setup lang="ts">

	import { onMounted, onUnmounted } from 'vue';
	import NotifTag from './NotifTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import { useNotifStore } from '@/stores/NotificationsStore'
	import type { SocketEvent } from '@/types/Socket';

	const	notifStore = useNotifStore()
	const	userStore = useUserStore()
	const	socket: any = userStore.socket

	const	listeners: SocketEvent[] = [
		{ name: 'user_connected', callback: (res: any) => notifStore.addNotif('infoG', '', 'connected') },
		{ name: 'friend_accepted', callback: (res: any) => notifStore.addNotif('infoG', res.username, 'new friend', res.avatar) },
		{ name: 'friend_accepted_submitted', callback: (res: any) => notifStore.addNotif('infoG', res.username, 'new friend', res.avatar) },
		{ name: 'friend_request_submitted', callback: (res: any) => notifStore.addNotif('infoG', res.username, 'invitation sent', res.avatar) },
		{ name: 'invitationAccepted', callback: () => notifStore.addNotif('infoG', '', 'invitation accepted') },
		{ name: 'inviteToRoomSuccess', callback: (res: any) => notifStore.addNotif('infoG', res.username, 'invitation sent', res.avatar) },

		{ name: 'user_disconnected', callback: (id: string) => notifStore.addNotif('infoR', '', 'disconnected') },
		{ name: 'friend_declined', callback: (res: any) => notifStore.addNotif('infoR', res.username, 'declined your invitation', res.avatar) },
		{ name: 'friend_removed', callback: (res: any) => notifStore.addNotif('infoR', res.username, 'has deleted you', res.avatar) },
		{ name: 'friend_declined_submitted', callback: (res: any) => notifStore.addNotif('infoR', res.username, 'invitation declined', res.avatar) },
		{ name: 'friend_removed_submitted', callback: (res: any) => notifStore.addNotif('infoR', res.username, 'friend removed', res.avatar) },
		{ name: 'invitationDeclined', callback: () => notifStore.addNotif('infoR', '', 'invitation declined') },
		{ name: 'roomLeft', callback: () => notifStore.addNotif('infoR', '', 'channel leaved') },
		{ name: 'banned', callback: (res: { name: string }) => { notifStore.addNotif('infoR', '', 'you have been banned from channel ' + res.name) } },

		{ name: 'friend_request', callback: (res: any) => notifStore.addNotif('infoB', res.username, 'new friend invitation', res.avatar) },
		{ name: 'chanInvitationReceived', callback: (res: any) => notifStore.addNotif('infoY', res.name, 'new channel invitation', res.avatar) },

		{ name: 'roomCreated', callback: () => notifStore.addNotif('success', 'Success', 'Channel created') },
		{ name: 'joinRoomSuccess', callback: () => notifStore.addNotif('success', 'Success', 'channel joined') },

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
		{ name: 'unbanUserFailed', callback: (err: string) => notifStore.addNotif('error', 'Error', err) },

		{ name: 'incomingMessage', callback: (res: any) => {
			if (res.channelName) {
				notifStore.addNotif('channelMessage', res.channelName, res.content, res.sender.avatar)
			}
			else
				notifStore.addNotif('privateMessage', res.sender.username, res.content, res.sender.avatar)
		}},
	]


	onMounted(() => {
		listeners.forEach(listener => socket.on(listener.name, listener.callback))
	})

	onUnmounted(() => {
		listeners.forEach(listener => socket.off(listener.name, listener.callback))
	})

</script>

<template>

	<div class="Notifications" v-if="notifStore.notifs.length">
		<NotifTag
			v-for="notif in notifStore.notifs"
			:key="notif.id"
			:notif="notif"
		/>
	</div>

</template>

