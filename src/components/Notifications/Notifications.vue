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

		listeners.push(socket.on('friend_request', (res: any) => { notifStore.addNotif('friend', res.username, 'new friend invitaion', res.avatar) }))
		listeners.push(socket.on('friend_request_submitted', (res: any) => { notifStore.addNotif('friend', res.username, 'invitaion sent', res.avatar); }))
		listeners.push(socket.on('friend_accepted', (res: any) => { notifStore.addNotif('friend', res.username, 'new friend', res.avatar) }))
		listeners.push(socket.on('friend_accepted_submitted', (res: any) => { notifStore.addNotif('friend', res.username, 'new friend', res.avatar) }))
		listeners.push(socket.on('friend_declined', (res: any) => { notifStore.addNotif('friend', res.username, 'declined your invitation', res.avatar) }))
		listeners.push(socket.on('friend_declined_submitted', (res: any) => { notifStore.addNotif('friend', res.username, 'friend invitation declined', res.avatar) }))
		listeners.push(socket.on('friend_removed', (res: any) => { notifStore.addNotif('friend', res.username, 'has deleted you', res.avatar) }))
		listeners.push(socket.on('friend_removed_submitted', (res: any) => { notifStore.addNotif('friend', res.username, 'friend removed', res.avatar) }))

		listeners.push(socket.on('roomCreated', (res: any) => { notifStore.addNotif('success', 'Success', 'Channel created') }))
		//listeners.push(socket.on('messageRoomFailed', (res: any) => { console.log('Message room failed', res) }))
		listeners.push(socket.on('chanInvitationReceived', (res: any) => { notifStore.addNotif('channel', res.name, 'new channel invitation', res.avatar) }))
		listeners.push(socket.on('invitationAccepted', (res: any) => { notifStore.addNotif('success', 'Success', 'Channel invitation accepted') ;console.log('invitation accepted', res) }))
		listeners.push(socket.on('invitationDeclined', (res: any) => { notifStore.addNotif('success', 'Success', 'Invitation declined') }))
		listeners.push(socket.on('inviteToRoomFailed', (res: any) => { notifStore.addNotif('error', 'Success', 'Invitation failed') }))
		listeners.push(socket.on('createRoomFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))
		listeners.push(socket.on('acceptInvitationFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))
		listeners.push(socket.on('joinRoomSuccess', (res: any) => { notifStore.addNotif('success', 'Success', 'Channel joined') }))
		listeners.push(socket.on('joinRoomFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))
		// listeners.push(socket.on('userPromoted', (res: any) => { console.log('user promoted', res) }))
		listeners.push(socket.on('promoteUserFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))
		// listeners.push(socket.on('userDemoted', (res: any) => { console.log('user demoted', res) }))
		listeners.push(socket.on('demoteUserFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))
		// listeners.push(socket.on('userMuted', (res: any) => { console.log('user muted', res) }))
		listeners.push(socket.on('muteUserFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))

		// listeners.push(socket.on('userUnmuted', (res: any) => { console.log('user unmuted', res) }))
		listeners.push(socket.on('unmuteUserFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))
		// listeners.push(socket.on('userBanned', (res: any) => { console.log('user banned', res) }))
		listeners.push(socket.on('banUserFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))
		// listeners.push(socket.on('userUnbanned', (res: any) => { console.log('user unbanned', res) }))
		listeners.push(socket.on('unbanUserFailed', (err: string) => { notifStore.addNotif('error', 'Error', err) }))
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
