<script setup lang="ts">

	import NotifTag from './NotifTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import { useSideBarStore } from '@/stores/SideBarStore';

	const	userStore = useUserStore()
	const	sbStore = useSideBarStore()
	const	socket = userStore.socket

	socket.on('pong', () => { console.log('pong') })
	socket.emit('ping', () => { console.log('ping emit') })

	socket.on('friend_request', (res: any) => { alert('Friend request'); console.log('friend request', res) })
	socket.on('friend_request_submitted', (res: any) => { console.log('friend request submitted', res) })
	socket.on('friend_accepted', (res: any) => { console.log('friend accepted', res) })
	socket.on('friend_accepted_submitted', (res: any) => { console.log('friend accepted submitted', res) })
	socket.on('friend_declined', (res: any) => { console.log('friend declined', res) })
	socket.on('friend_declined_submitted', (res: any) => { console.log('friend declined submitted', res) })
	socket.on('friend_removed', (res: any) => { console.log('friend removed', res) })
	socket.on('friend_removed_submitted', (res: any) => { console.log('friend removed submitted', res) })


	socket.on('messageRoomFailed', (res: any) => { console.log('Message room failed', res) })
	socket.on('chanInvitationReceived', (res: any) => { alert('chan invitation received'), console.log('chan Invitation received', res) })
	socket.on('invitationAccepted', (res: any) => { console.log('invitation accepted', res) })
	socket.on('invitationDeclined', (res: any) => { console.log('invitation declined', res) })
	socket.on('inviteToRoomFailed', (res: any) => { alert('Invite to room failed'), console.log('Invite to room failed', res) })
	socket.on('createRoomFailed', (res: any) => { alert('Error cannot create this channel'), console.log('Error cannot create channel', res) })
	socket.on('acceptInvitationFailed', (res: any) => { alert('Accept invitation failed'), console.log('message room failed', res) })
	socket.on('joinRoomSuccess', (res: any) => { console.log('notif Room joined', res) })
	socket.on('roomDeclined', (res: any) => { console.log('Room declined', res) })
	socket.on('DMChan', (res: any) => { console.log('DM chan', res) })
	socket.on('joinRoomFailed', (res: any) => { alert('Join room failed'); console.log('Join room failed', res) })
	socket.on('userPromoted', (res: any) => { console.log('user promoted', res) })
	socket.on('promoteUserFailed', (res: any) => { console.log('promote user failed', res) })
	socket.on('userDemoted', (res: any) => { console.log('user demoted', res) })
	socket.on('demoteUserFailed', (res: any) => { console.log('demote user failed', res) })
	socket.on('userMuted', (res: any) => { console.log('user muted', res) })
	socket.on('muteUserFailed', (res: any) => { console.log('mute user failed', res) })
	socket.on('userUnmuted', (res: any) => { console.log('user unmuted', res) })
	socket.on('unmuteUserFailed', (res: any) => { console.log('unmute user failed', res) })
	socket.on('userBanned', (res: any) => { console.log('user banned', res) })
	socket.on('banUserFailed', (res: any) => { console.log('ban user failed', res) })
	socket.on('userUnbanned', (res: any) => { console.log('user unbanned', res) })
	socket.on('unbanUserFailed', (res: any) => { console.log('unban user failed', res) })

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
