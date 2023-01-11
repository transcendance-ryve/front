<script setup lang="ts">

	import NotifTag from './NotifTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import { useSideBarStore } from '@/stores/SideBarStore';

	const	userStore = useUserStore()
	const	sbStore = useSideBarStore()
	const	socket = userStore.socket

	socket.on('pong', () => { console.log('pong') })
	socket.emit('ping', () => { console.log('ping emit') })

	socket.on('messageRoomFailed', (res: any) => { console.log('message room failed'), console.log('Message room failed', res) })
	socket.on('chanInvitationReceived', (res: any) => { alert('chan invitation received'), console.log('chan Invitation received', res) })
	socket.on('inviteToRoomFailed', (res: any) => { alert('Invite to room failed'), console.log('Invite to room failed', res) })
	socket.on('createRoomFailed', (res: any) => { alert('Error cannot create this channel'), console.log('Error cannot create channel', res) })
	socket.on('acceptInvitationFailed', (res: any) => { alert('Accept invitation failed'), console.log('message room failed', res) })
	socket.on('friend_request', (res: any) => { alert('Friend request'); console.log('friend request', res) })
	socket.on('friend_accepted', (res: any) => { alert('Friend accepted'); console.log('friend accepted', res) })
	socket.on('friend_declined', (res: any) => { alert('Friend declined'); console.log('friend declined', res) })
	socket.on('roomJoined', (res: any) => { alert('Room joined'); console.log('Room joined', res) })
	socket.on('roomDeclined', (res: any) => { alert('Room declined'); console.log('Room declined', res) })
	socket.on('dmChan', (res: any) => { alert('dmChan'); console.log('dm chan', res) })
	socket.on('joinRoomFailed', (res: any) => { alert('Join room failed'); console.log('Join room failed', res) })

</script>

<template>

	<div class="Notifications">
		<NotifTag
			avatar="http://localhost:3000/default.png"
			label="vintran"
			text="New friend invitation"
		/>
		<NotifTag
			avatar="http://localhost:3000/default.png"
		/>
		<NotifTag
			avatar="http://localhost:3000/default.png"
		/>
	</div>

</template>
