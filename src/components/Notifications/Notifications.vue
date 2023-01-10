<script setup lang="ts">

	import NotifTag from './NotifTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import { useSideBarStore } from '@/stores/SideBarStore';

	const	userStore = useUserStore()
	const	sbStore = useSideBarStore()
	const	socket = userStore.socket

	socket.on('pong', () => { console.log('pong') })
	socket.emit('ping', () => { console.log('ping emit') })

	socket.on('incomingMessage', (msg: any) => {
		console.log('incoming message', msg)
		sbStore.conv.lastMsg = msg
	})
	socket.on('messageRoomFailed', () => { console.log('message room failed') })
	socket.on('chanInvitationReceived', () => { alert('invitation received') })
	socket.on('inviteToRoomFailed', () => { alert('Invite to room failed') })
	socket.on('createRoomFailed', () => { alert('Error cannot create this channel') })
	socket.on('acceptInvitationFailed', () => { alert('Accept invitation failed') })
	socket.on('friend_request', (res: any) => { alert('Friend request'); console.log('friend request', res) })
	socket.on('friend_accepted', (res: any) => { alert('Friend accepted'); console.log('friend accepted', res) })
	socket.on('friend_declined', (res: any) => { alert('Friend declined'); console.log('friend declined', res) })

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
