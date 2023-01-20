<script setup lang="ts">

	import { ref, type Ref, onMounted, watch, onUnmounted } from 'vue'
	import ConvTag from './ConvTag.vue'
	import ConvContent from './ConvContent.vue'
	import ConvList from './ConvList.vue'
	import ChanSettings from './ChanSettings.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import { logoSend } from '../../assets/logoSVG'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import type { axiosState } from '@/requests/useAxios'
	import getChannelsByID from '@/requests/SideBar/getChannelByID'
	import type { Channel } from '@/requests/SideBar/getChannelByID'
	import getUser from '@/requests/SideBar/getUser'
	import getMessages from '@/requests/SideBar/getMessages'
	import getBlockRelation from '@/requests/Friends/getBlockRelation'
	import { useUserStore } from '@/stores/UserStore'
	import type { Target } from '@/types/User'
	import type { TargetTag } from '@/types/User'
	import { profileRedirect } from '@/router/index'
	import type { SocketEvent } from '@/types/Socket'

	const	dataState: Ref<axiosState> = ref({
		error: null,
		loading: true
	})

	const	target: Ref<Target> = ref({
		id: '',
		avatar: '',
		name: '',
		username: '',
		status: '',
		createdAt: 0
	})

	const	sbStore = useSideBarStore()
	const	input: Ref<string> = ref('')
	const	userList = ref(false)
	const	settings = ref(false)
	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	convId: Ref<string> = ref('')
	const	role: Ref<string> = ref('')
	const	friendBlocked: Ref<boolean> = ref(false)
	const	messages: Ref<any[]> = ref([])
	const	totalMsg: Ref<number> = ref(1)
	let		page: number = 0

	watch(convId, async () => {
		await getConvMessages()
	})

	const	getConvMessages = async () => {
		const	res: Ref<any[]> = ref([])
		if (messages.value.length < totalMsg.value) {
			dataState.value = await getMessages(convId.value, page, res, totalMsg)
			console.log('getConvMessages', res.value)
			messages.value = res.value.concat(messages.value)
			page++
			return true
		}
		return false
	}

	const	removeFriend = () => {
		socket.emit('remove_friend', { friendId: target.value.id })
		sbStore.conv.open = false
	}

	const	sendMessage = () => {
		if (input.value) {
			socket.emit('messageRoom', { messageInfo: { channelId: convId.value, content: input.value } })
			input.value = ''
		}
	}

	const	updateChan = async () => {
		dataState.value = await getChannelsByID(sbStore.conv.id, target)
		settings.value = false
	}

	const	friendListeners: SocketEvent[] = [
		{ name: 'DMChan', callback: (id: string) => { convId.value = id } },
		{ name: 'incomingMessage', callback: (msg: any) => {
			// console.log('incomingMessage dm', msg)
			if (friendBlocked.value && msg.sender.id === target.value.id)
				msg.content = 'This user is blocked'
			messages.value.push(msg)
			totalMsg.value++
		}},
		{
			name: 'targetBlocked',
			callback: (id: string) => {
				if (id === sbStore.conv.id) friendBlocked.value = true
			}
		},
		{
			name: 'user_blocked_submitted',
			callback: (receiver: any) => {
				if (receiver.id === sbStore.conv.id) friendBlocked.value = true
			}
		},
		{
			name: 'user_unblocked_submitted',
			callback: (receiver: any) => {
				if (receiver.id === sbStore.conv.id) friendBlocked.value = false
			}
		},
		{
			name: 'friend_removed',
			callback: (sender: any) => {
				if (sender.id === target.value.id) {
					sbStore.conv.open = false
					sbStore.state.section = 1
				}
			}
		},
		{
			name: 'friend_removed_submitted',
			callback: (receiver: any) => {
				if (receiver.id === target.value.id) {
					sbStore.conv.open = false
					sbStore.state.section = 1
				}
			}
		}
	]

	const	chanListeners: SocketEvent[] = [
		{ name: 'role', callback: (res: string) => role.value = res },
		{ name: 'userPromoted', callback: (target: TargetTag) => {
			if (userStore.me.id === target.id) {
				role.value = 'ADMIN'
				if (userList.value) {
					userList.value = false
					settings.value = true
				}
			}
		}},
		{ name: 'userDemoted', callback: (target: TargetTag) => {
			if (userStore.me.id === target.id) {
				role.value = 'MEMBER'
				if (settings.value) {
					settings.value = false
					userList.value = true
				}
			}
		}},
		{ name: 'userBanned', callback: (target: TargetTag) => {
			if (userStore.me.id === target.id) {
				sbStore.conv.open = false
				sbStore.state.section = 2
			}
		}},
		{ name: 'incomingMessage', callback: async (msg: any) => {
			// console.log('incomingMessage chan', msg)
			if (await getBlockRelation(msg.sender.id) === 'targetBlocked')
				msg.content = 'This user is blocked'
			messages.value.push(msg)
			totalMsg.value++
		}},
		{
			name: 'roomUpdated', callback: (res: { name: string, status: string, avatar: string }) => {
				console.log('room utpdated')
				target.value.name = res.name
				target.value.status = res.status
				target.value.avatar = res.avatar
			}
		},
		{ name: 'roomLeft', callback: () => { sbStore.conv.open = false; sbStore.state.section = 2 } }
	]

	const	commonListeners: SocketEvent[] = [

	]

	onMounted(async () => {
		if (sbStore.conv.focus === true || window.innerWidth > 1440)
			(document.getElementById('WriteMessage')?.children[0] as HTMLElement).focus()
		if (sbStore.conv.type === 'Friend') {
			dataState.value = await getUser(sbStore.conv.id, 'id,avatar,username,status', target)			
			socket.emit('DM', { DMInfo: { friendId: sbStore.conv.id } })
			socket.emit('isBlockedRelation', { targetId: sbStore.conv.id })
			friendListeners.forEach(listener => socket.on(listener.name, listener.callback))
		}
		else {
			dataState.value = await getChannelsByID(sbStore.conv.id, target)
			convId.value = target.value.id
			socket.emit('getRole', { channelId: convId.value })
			chanListeners.forEach(listener => socket.on(listener.name, listener.callback))
		}
	})

	onUnmounted(() => {
		if (sbStore.conv.type === 'Friend')
			friendListeners.forEach(listener => socket.off(listener.name, listener.callback))
		else
			chanListeners.forEach(listener => socket.off(listener.name, listener.callback))
	})

</script>

<template>

	<div class="SideBarConv">
		<div
			v-if="!settings"
			class="SideBarConv-contentWrap"
			:class="{'ContentWrap--List': userList == true}"
		>
			<ConvTag
				v-if="!dataState.error && !dataState.loading"
				:type="sbStore.conv.type"
				:target="target"
				:admin="role === 'OWNER' || role === 'ADMIN' ? true : false"
				:userList="userList"
				:friendBlocked="friendBlocked"
				@userList="userList = true"
				@settings="settings = true"
				@conv="userList = false"
				@see="profileRedirect(target.id)"
				@delete="removeFriend()"
				@quit="socket.emit('leaveRoom', { channelId: target.id })"
				@block="socket.emit('block_user', { blockedId: target.id })"
				@unblock="socket.emit('unblock_user', { blockedId: target.id })"
			/>
			<ConvContent
				v-if="!userList && !dataState.error && !dataState.loading"
				:messages="messages"
				:getFollowing="getConvMessages"
			/>
			<ConvList
				v-if="userList && !dataState.error && !dataState.loading"
				:channelId="target.id" :role="role"
			/>
		</div>
		<ChanSettings
			v-if="settings"
			:channel="target"
			:role="role"
			@close="settings = false"
			@update="updateChan()"
		/>
		<BaseInput
			v-if="!userList && !settings"
			id="WriteMessage"
			v-model="input"
			placeholder="Write your message"
			:logo="logoSend"
			inputHeight="72em"
			inputPadding="16em"
			borderRadius="0 0 16em 16em"
			@keyup.enter="sendMessage()"
		/>
	</div>

</template>
