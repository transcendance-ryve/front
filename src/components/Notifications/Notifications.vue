<script setup lang="ts">

	import { onMounted, onUnmounted } from 'vue';
	import NotifTag from './NotifTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import { useNotifStore } from '@/stores/NotificationsStore'

	const	notifStore = useNotifStore()
	const	userStore = useUserStore()
	const	socket = userStore.socket

	const	listeners: any[] = []

	// setInterval(() => notifStore.addNotif('Ping', '', ''), Math.random() * 2000)
	// setTimeout(() => notifStore.addNotif('Ping', '', ''), 1000)

	// socket.on('pong', () => { console.log('pong') })
	// socket.emit('ping', () => { console.log('ping emit') })

	onMounted(() => {
		// listeners.push(socket.on('pong', () => { notifStore.addNotif('', 'Pong', '', '') }))

		listeners.push(socket.on('user_connected', (id: string) => notifStore.addNotif('infoG', '', 'connected')))
		listeners.push(socket.on('friend_accepted', (res: any) => { notifStore.addNotif('infoG', res.username, 'new friend', res.avatar) }))
		listeners.push(socket.on('friend_accepted_submitted', (res: any) => notifStore.addNotif('infoG', res.username, 'new friend', res.avatar)))
		listeners.push(socket.on('friend_request_submitted', (res: any) => notifStore.addNotif('infoG', res.username, 'invitation sent', res.avatar)))
		listeners.push(socket.on('invitationAccepted', () => notifStore.addNotif('infoG', '', 'invitation accepted')))
		listeners.push(socket.on('invitationSent', (res: any) => notifStore.addNotif('infoG', res.username, 'invitation sent', res.avatar)))

		listeners.push(socket.on('user_disconnected',  (id: string) => notifStore.addNotif('infoG', '', 'disconnected')))
		listeners.push(socket.on('friend_declined', (res: any) => notifStore.addNotif('infoR', res.username, 'declined your invitation', res.avatar)))
		listeners.push(socket.on('friend_removed', (res: any) => notifStore.addNotif('infoR', res.username, 'has deleted you', res.avatar)))
		listeners.push(socket.on('friend_declined_submitted', (res: any) => notifStore.addNotif('infoR', res.username, 'invitation declined', res.avatar)))
		listeners.push(socket.on('friend_removed_submitted', (res: any) => notifStore.addNotif('infoR', res.username, 'friend removed', res.avatar)))
		listeners.push(socket.on('invitationDeclined', () => notifStore.addNotif('infoR', '', 'invitation declined')))
		listeners.push(socket.on('roomLeft', () => notifStore.addNotif('infoR', '', 'channel leaved')))

		listeners.push(socket.on('friend_request', (res: any) => notifStore.addNotif('infoB', res.username, 'new friend invitation', res.avatar)))
		listeners.push(socket.on('chanInvitationReceived', (res: any) => notifStore.addNotif('infoY', res.name, 'new channel invitation', res.avatar)))

		listeners.push(socket.on('roomCreated', () => notifStore.addNotif('success', 'Success', 'Channel created')))
		listeners.push(socket.on('joinRoomSuccess', () => notifStore.addNotif('success', 'Success', 'channel joined')))
		
		listeners.push(socket.on('acceptInvitationFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('inviteToRoomFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('createRoomFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('joinRoomFailed', () => notifStore.addNotif('error', 'Error', 'Cannot join channel')))
		listeners.push(socket.on('promoteUserFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('demoteUserFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('muteUserFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('messageRoomFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('unmuteUserFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('banUserFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
		listeners.push(socket.on('unbanUserFailed', (err: string) => notifStore.addNotif('error', 'Error', err)))
	})

	onUnmounted(() => {
		listeners.forEach(listener => socket.off(listener))
	})

</script>

<template>

	<div class="Notifications" v-if="notifStore.notifs.length">
		<NotifTag
			v-for="notif in notifStore.notifs"
			:key="notif.id"
			:notif="notif"
		/>
		<!-- <NotifTag
			:notif="{
				type: 'friend',
				id: '1',
				label: 'vintran',
				text: 'new friend invitation',
				avatar: 'http://localhost:3000/default.png'
			}"
		/>
		<NotifTag
			:notif="{
				type: 'success',
				id: '2',
				label: 'fwihk',
				text: 'oadij edow ifb riwfbd d qndo woeifn',
				avatar: 'http://localhost:3000/default.png'
			}"
		/>
		<NotifTag
			:notif="{
				type: 'channel',
				id: '3',
				label: 'RYVE',
				text: 'new channel invitation',
				avatar: 'http://localhost:3000/default.png'
			}"
		/> -->
	</div>

</template>
