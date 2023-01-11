<script setup lang="ts">

	import { ref, type Ref, onMounted, watch, onUnmounted } from 'vue'
	import ConvTag from './ConvTag.vue'
	import ConvContent from './ConvContent.vue'
	import ConvList from './ConvList.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import { logoSend } from '../../assets/logoSVG'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import type { axiosState } from '@/requests/useAxios'
	import getChannelsByID from '@/requests/SideBar/getChannelByID'
	import type { Channel } from '@/requests/SideBar/getChannelByID'
	import getUser from '@/requests/SideBar/getUser'
	import getMessages from '@/requests/SideBar/getMessages'
	import type { message } from '@/requests/SideBar/getMessages'
	import { useUserStore } from '@/stores/UserStore'


	export interface Target {
		id: string,
		avatar: string,
		name: string,
		username: string,
		status: string,
	}

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
	})

	const	sbStore = useSideBarStore()
	const	input: Ref<string> = ref('')
	const	messages: Ref<any[]> = ref([])
	const	userList = ref(false)
	const	userStore = useUserStore()
	const	socket = userStore.socket
	let		convId: Ref<string> = ref('')

	watch(convId, async (newVal: string) => {
		dataState.value = await getMessages(newVal, messages)
	})

	const	sendMessage = () => {
		if (input.value) {
			socket.emit('messageRoom', { messageInfo: { channelId: convId.value, content: input.value } })
			input.value = ''
		}
	}

	onMounted(async () => {
		if (sbStore.conv.type === 'Friend') {
			dataState.value = await getUser(sbStore.conv.id, 'id,avatar,username,status', target)
			socket.emit('DM', { DMInfo: { friendId: sbStore.conv.id } })
		}
		else {
			dataState.value = await getChannelsByID(sbStore.conv.id, target)
			convId.value = target.value.id
		}
		socket.on('incomingMessage', (msg: any) => {
			console.log('incoming message', msg)
			messages.value.push({ content: msg })
		})
		socket.once('DMChan', (id: string) => { console.log('DMChan', id); convId.value = id })
		socket.on('roomLeft', () => { sbStore.conv.open = false; sbStore.state.section = 2 })
	})

	onUnmounted(() => {
		socket.off('incomingMessage')
		socket.off('roomLeft')
	})

</script>

<template>

	<div class="SideBarConv">
		<div
			class="SideBarConv-contentWrap"
			:class="{'ContentWrap--List': userList == true}"
		>
			<ConvTag
				v-if="!dataState.error && !dataState.loading"
				:type="sbStore.conv.type"
				:target="target"
				@userList="userList = true"
				@conv="userList = false"
				@quit="socket.emit('leaveRoom', { channelId: target.id })"
			/>
			<ConvContent v-if="!userList && !dataState.error && !dataState.loading" :messages="messages"/>
			<ConvList v-if="userList && !dataState.error && !dataState.loading" :id="target.id"/>
		</div>
		<BaseInput
			v-if="!userList"
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
