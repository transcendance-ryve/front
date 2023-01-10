<script setup lang="ts">

	import NotifTag from './NotifTag.vue'
	import { useUserStore } from '@/stores/UserStore';

	const	userStore = useUserStore()
	const	socket = userStore.socket

	socket.on('pong', () => { console.log('pong') })
	socket.emit('ping', () => { console.log('ping emit') })

	socket.on('chanInvitationReceived', () => { alert('invitation received') })
	socket.on('inviteToRoomFailed', () => { alert('Invite to room failed') })
	socket.on('createRoomFailed', () => { alert('Error cannot create this channel') })
	socket.on('acceptInvitationFailed', () => { alert('Accept invitation failed') })
	socket.on('friend_request', (id: string) => { alert('Friend request'); console.log('friend request', id) })
	socket.on('friend_accepted', (id: string) => { alert('Friend accepted'); console.log('friend accepted', id) })
	socket.on('friend_declined', (id: string) => { alert('Friend declined'); console.log('friend declined', id) })

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
