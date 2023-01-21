<template>

	<div class="Notifications" v-if="notifStore.notifs.length">
		<NotifTag
			v-for="notif in notifStore.notifs"
			:key="notif.id"
			:notif="notif"
		/>
	</div>

</template>


<script setup lang="ts">

	import { onMounted, onUnmounted } from 'vue';
	import NotifTag from './NotifTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import { useNotifStore } from '@/stores/NotificationsStore'
	import { useSideBarStore } from '@/stores/SideBarStore';
	import type { SocketEvent } from '@/types/Socket';
	import router, { profileRedirect } from '@/router';

	const	notifStore = useNotifStore()
	const	userStore = useUserStore()
	const	sbStore = useSideBarStore()
	const	socket: any = userStore.socket

	const	listeners: SocketEvent[] = [
		{
			name: 'user_connected',
			callback: (res: any) => notifStore.addNotif('infoG', res.username, 'connected', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_accepted',
			callback: (res: any) => notifStore.addNotif('infoG', res.username, 'new friend', res.avatar, () => profileRedirect(res.id))
		},
		{
			name: 'friend_accepted_submitted',
			callback: (res: any) => notifStore.addNotif('infoG', res.username, 'new friend', res.avatar, () => profileRedirect(res.id))
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
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'declined your invitation', res.avatar)
		},
		{
			name: 'friend_removed',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'has deleted you', res.avatar)
		},
		{
			name: 'friend_declined_submitted',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'invitation declined', res.avatar)
		},
		{
			name: 'friend_removed_submitted',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'friend removed', res.avatar)
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
			callback: (res: any) => notifStore.addNotif('infoB', res.username, 'new friend invitation', res.avatar)
		},
		{
			name: 'chanInvitationReceived',
			callback: (res: any) => notifStore.addNotif('infoY', res.name, 'new channel invitation', res.avatar)
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
			name: 'acceptInvitationFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'messageRoomFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'inviteToRoomFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'createRoomFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'joinRoomFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'promoteUserFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'demoteUserFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'muteUserFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'unmuteUserFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'banUserFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'unbanUserFailed',
			callback: (err: string) => notifStore.addNotif('error', 'Error', err)
		},
		{
			name: 'incomingMessage',
			callback: (res: any, convId: string) => {
				if (userStore.me.id === res.sender.id)
					return
				const	convOpen = sbStore.conv.open
				if (res.channelName && ((convOpen && sbStore.conv.id !== convId) || !convOpen)) {
					notifStore.addNotif('channelMessage', res.channelName, res.content, res.sender.avatar,
					() => sbStore.openConv('Channel', convId, false))
				}
				else if (!res.channelName && ((convOpen && sbStore.conv.id !== res.sender.id) || !convOpen))
					notifStore.addNotif('privateMessage', res.sender.username, res.content, res.sender.avatar,
					() => sbStore.openConv('Friend', res.sender.id, false))
			}
		},
		{
			name: "private_game_request",
			callback: (res: any) => {
				console.log(res);
				notifStore.addNotif('infoY', res.username, 'game request', res.avatar);
			}
		},
		{
			name: "game_request_error",
			callback: (res: any) => {
				console.log(res);
				notifStore.addNotif('error', 'Error', res);
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
				notifStore.addNotif('infoY', res.username, 'game request accepted', res.avatar);
			}
		},


		// {
		// 	name: 'user_blocked',
		// 	callback: (res: any) => console.log('user_blocked', res)
		// },
		{
			name: 'user_blocked_submitted',
			callback: (res: any) => notifStore.addNotif('infoR', res.username, 'is blocked', res.avatar)
		},
		// {
		// 	name: 'user_unblocked',
		// 	callback: (res: any) => console.log('user_unblocked', res)
		// },
		{
			name: 'user_unblocked_submitted',
			callback: (res: any) => notifStore.addNotif('infoG', res.username, 'is unblocked', res.avatar)
		}
	]


	onMounted(() => {
		listeners.forEach(listener => socket.on(listener.name, listener.callback))
	})

	onUnmounted(() => {
		listeners.forEach(listener => socket.off(listener.name, listener.callback))
	})

</script>
