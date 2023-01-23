<script setup lang="ts">

	import { ref, type Ref, onMounted, watch, onUnmounted } from 'vue'
	import ConvTag from './ConvTag.vue'
	import ConvContent from './ConvContent.vue'
	import ConvList from './ConvList.vue'
	import ChanSettings from './ChanSettings.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import { logoSend } from '../../assets/logoSVG'
	import { useSidebarStore } from '../../stores/SidebarStore'
	import type { axiosState } from '@/requests/useAxios'
	import getChannelsByID from '@/requests/Sidebar/Channels/getChannelByID'
	import getUser from '@/requests/Sidebar/getUser'
	import getUsersInChannel from '@/requests/Sidebar/Channels/getUsersInChannel'
	import getMessages from '@/requests/Sidebar/getMessages'
	import getBlockRelation from '@/requests/Sidebar/Friends/getBlockRelation'
	import getPlayerGame from '@/requests/Sidebar/Games/getPlayerGame'
	import { useUserStore } from '@/stores/UserStore'
	import type { Target } from '@/types/User'
	import type { TargetTag } from '@/types/User'
	import router, { profileRedirect } from '@/router/index'
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

	const	sbStore = useSidebarStore()
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
			messages.value = res.value.concat(messages.value)
			page++
			return true
		}
		return false
	}

	const	reloadConv = () => {
		page = 0
		messages.value = []
		getConvMessages()
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
		{
			name: 'targetBlocked',
			callback: (id: string) => {
				if (id === sbStore.conv.id) friendBlocked.value = true
			}
		},
		{
			name: 'friend_removed',
			callback: (sender: Partial<Target>) => {
				if (sender.id === target.value.id) {
					sbStore.conv.open = false
					sbStore.state.section = 1
				}
			}
		},
		{
			name: 'friend_removed_submitted',
			callback: (receiver: Partial<Target>) => {
				if (receiver.id === target.value.id) {
					sbStore.conv.open = false
					sbStore.state.section = 1
				}
			}
		},
		{
			name: 'user_connected',
			callback: (user: Partial<Target>) => {
				if (user.id === target.value.id)
				target.value.status = 'ONLINE'
			}
		},
		{
			name: 'user_disconnected',
			callback: (user: Partial<Target>) => {
				if (user.id === target.value.id)
					target.value.status = 'OFFLINE'
			}
		},
		{
			name: 'user_in_game',
			callback: (user: Partial<Target>) => {
				if (user.id === target.value.id)
					target.value.status = 'INGAME'
			}
		},
		{
			name: 'user_left_game',
			callback: (user:Partial<Target>) => {
				if (user.id === target.value.id)
					target.value.status = 'ONLINE'
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
		{
			name: 'roomUpdated', callback: (res: { name: string, status: string, avatar: string }) => {
				target.value.name = res.name
				target.value.status = res.status
				target.value.avatar = res.avatar
			}
		},
		{ name: 'roomLeft', callback: () => { sbStore.conv.open = false; sbStore.state.section = 2 } }
	]

	const	commonListeners: SocketEvent[] = [
		{
			name: 'incomingMessage',
			callback: async (msg: any) => {
				if (sbStore.conv.type === 'Friend' && friendBlocked.value && msg.sender.id === target.value.id)
					msg.content = 'This user is blocked'
				else if (await getBlockRelation(msg.sender.id) === 'targetBlocked')
					msg.content = 'This user is blocked'
				messages.value.push(msg)
				totalMsg.value++
			}
		},
		{
			name: 'user_blocked_submitted',
			callback: (receiver: Partial<Target>) => {
				if (receiver.id === sbStore.conv.id)
					friendBlocked.value = true
				messages.value.forEach((msg: any) => {
					if (msg.sender.id === receiver.id)
						msg.content = 'This user is blocked'
				})
			}
		},
		{
			name: 'user_unblocked_submitted',
			callback: async (receiver: Partial<Target>) => {
				if (sbStore.conv.type === 'Friend' && receiver.id === sbStore.conv.id) {
					friendBlocked.value = false
					reloadConv()
				}
				else if (sbStore.conv.type === 'Channel') {
					const	users: Partial<Target>[] = await getUsersInChannel(sbStore.conv.id)
					if (users.some((user: Partial<Target>) => user.id === receiver.id))
						reloadConv()
				}
			}
		},

	]

	const	spectate = async () => {
		sbStore.spectate.gameId = await getPlayerGame(target.value.id)
		router.push({ path: '/spectate', query: { order: 'desc' } })
	}

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
		commonListeners.forEach(listener => socket.on(listener.name, listener.callback))
	})

	onUnmounted(() => {
		if (sbStore.conv.type === 'Friend')
			friendListeners.forEach(listener => socket.off(listener.name, listener.callback))
		else
			chanListeners.forEach(listener => socket.off(listener.name, listener.callback))
		commonListeners.forEach(listener => socket.off(listener.name, listener.callback))
	})

</script>

<template>

	<div class="SidebarConv">
		<div
			v-if="!settings"
			class="SidebarConv-contentWrap"
			:class="{'ContentWrap--List': userList === true}"
		>
			<ConvTag
				v-if="!dataState.error && !dataState.loading"
				:type="sbStore.conv.type"
				:target="target"
				:admin="role === 'OWNER' || role === 'ADMIN' ? true : false"
				:userList="userList"
				:friendBlocked="friendBlocked"
				@usersList="userList = true"
				@settings="settings = true"
				@conversation="userList = false"
				@see="profileRedirect(target.id)"
				@delete="removeFriend()"
				@quit="socket.emit('leaveRoom', { channelId: target.id })"
				@block="socket.emit('block_user', { blockedId: target.id })"
				@unblock="socket.emit('unblock_user', { blockedId: target.id })"
				@spectate="spectate()"
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
