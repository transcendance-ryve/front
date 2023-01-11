<script setup lang="ts">

	import { reactive, ref, watch, computed, type Ref, onMounted, onUnmounted } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import { useUserStore } from '@/stores/UserStore'
	import SideBarSwitch from './SideBarSwitch.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import SideBarTag from './SideBarTag.vue'
	import { profileRedirect } from '@/router'
	import type { axiosState } from '@/requests/useAxios'
	import getFriends from '@/requests/Friends/getFriends'
	import getUsers from '@/requests/SideBar/getUsers'
	import getFriendsRequests from '@/requests/Friends/getFriendsRequests'
	import getMyChannels from '@/requests/SideBar/getMyChannels'
	import getChannels from '@/requests/SideBar/getChannels'
	import getChannelsNotifs from '@/requests/SideBar/getChannelsNotifs'

	export interface	ContentData {
		id: string,			//	user			id
		avatar: string,		//	user / chan		avatar
		username: string,	//	user 			name
		name: string,		//	chan 			name
		status: string,		//	user / chan		status
		time: number,		//	user / chan		timer
		lastMsg: string,	//	user / chan		last message
		usersCount: number,	//	chan			users count
		messages: any[]		//	user / chan		last message
	}

	const	data5: Partial<ContentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Karim',
			time: 5,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Kylian',
			time: 23,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Antoine',
			time: 4,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Ousmane',
			time: 8,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Kingsley',
			time: 2,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Raphael',
			time: 17,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Benjamin',
			time: 6,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Theo',
			time: 1,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Lucas',
			time: 63,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Adrien',
			time: 55,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Alphonse',
			time: 13,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Steve',
			time: 16,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Olivier',
			time: 51,
			status: 'ONLINE'
		},
	])

	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})
	const	sbStore = useSideBarStore()
	const	userStore = useUserStore()
	const	socket = userStore.socket

	const	contentData: Ref<Partial<ContentData>[]> = ref([])

	const	getRawData = async () => {
		let	fetchData: Partial<ContentData>[] = []

		if (sbStore.state.section == 1) {
			if (sbStore.state.friendsState == 1)
				fetchData = await getFriends(dataState)
			else if (toFind.value)
				fetchData = await getUsers(toFind.value, dataState)
		}
		else if (sbStore.state.section == 2) {
			if (sbStore.state.channelsState == 1) {
				fetchData = await getMyChannels(dataState)
				console.log('Channels', fetchData)
			}
			else
				// fetchData = data4
				fetchData = await getChannels(toFind.value, dataState)
		}
		else {
			if (sbStore.state.notifsState == 1)
				fetchData = data5
			else if (sbStore.state.notifsState == 2)
				fetchData = await getFriendsRequests(dataState)
			else
				fetchData = await getChannelsNotifs(dataState)
		}
		contentData.value = fetchData
	}

	// const	sortData = () => {
		// contentData.sort((a, b) => {
		// 	return a.time! - b.time!
		// })
	// }

	watch(sbStore.state, async () => {
		await getRawData()
		// sortData()
	})

	const	toFind: Ref<string> = ref('')

	const	filterDataBySearch = () => {
		return contentData.value.filter(item => {
			return item.name?.toLowerCase().includes(toFind.value.toLowerCase())
			|| item.username?.toLowerCase().includes(toFind.value.toLowerCase())
		})
	}

	watch(toFind, async () => {
		if (toFind.value) {
			if (sbStore.state.section === 1 && sbStore.state.friendsState === 2)
				contentData.value = await getUsers(toFind.value, dataState)
			else if (sbStore.state.section === 2 && sbStore.state.channelsState === 2)
				contentData.value = await getChannels(toFind.value, dataState)
		}
	})

	const	data = computed(() => {
		if (dataState.error || dataState.loading)
			return
		if (toFind.value) {
			if ((sbStore.state.section === 1 && sbStore.state.friendsState === 2) || sbStore.state.section === 2 && sbStore.state.channelsState === 2)
				return contentData.value
			else
				return filterDataBySearch()
		}
		else if (!((sbStore.state.section === 1 && sbStore.state.friendsState === 2) ||
				(sbStore.state.section === 2 && sbStore.state.channelsState === 2)))
			return contentData.value
	})

	const	openConv = (id: string = '') => {
		if (sbStore.state.section == 1 && sbStore.state.friendsState == 1) {
			sbStore.openConv('Friend', id)
		}
		else if (sbStore.state.section == 2 && sbStore.state.channelsState == 1) {
			sbStore.openConv('Channel', id)
		}
	}

	onMounted(() => {
		getRawData()
		socket.on('friend_request', (sender: Partial<ContentData>) => {
			if (sbStore.state.section === 3 && sbStore.state.notifsState === 2)
				contentData.value.unshift(sender)
		})
		socket.on('friend_request_submitted', (receiver: Partial<ContentData>) => {
			if (sbStore.state.section === 1 && sbStore.state.friendsState === 2)
				contentData.value = contentData.value.filter(item => item.id !== receiver.id)
		})
		socket.on('friend_accepted', (sender: Partial<ContentData>) => {
			if (sbStore.state.section === 1 && sbStore.state.friendsState === 1)
				contentData.value.unshift(sender)
		})
		socket.on('friend_accepted_submitted', (receiver: Partial<ContentData>) => {
			if (sbStore.state.section === 3 && sbStore.state.notifsState === 2) {
				console.log('okokokok')
				contentData.value = contentData.value.filter(item => item.id !== receiver.id)
			}
		})
		socket.on('friend_declined_submitted', (receiver: Partial<ContentData>) => {
			if (sbStore.state.section === 3 && sbStore.state.notifsState === 2)
				contentData.value = contentData.value.filter(item => item.id !== receiver.id)
		})
		socket.on('chanInvitationReceived', (sender: Partial<ContentData>) => {
			console.log('in invit', sender)
			if (sbStore.state.section === 3 && sbStore.state.notifsState === 3)
				contentData.value.unshift(sender)
		})
		socket.on('invitationAccepted', (id: string) => {
			if (sbStore.state.section === 3 && sbStore.state.notifsState === 3)
				contentData.value = contentData.value.filter(item => item.id !== id)
		})
		socket.on('invitationDeclined', (id: string) => {
			if (sbStore.state.section === 3 && sbStore.state.notifsState === 3)
				contentData.value = contentData.value.filter(item => item.id !== id)
		})
	})

	onUnmounted(() => {
		socket.off('friend_request')
		socket.off('friend_request_submitted')
		socket.off('chanInvitationReceived')
		socket.off('invitationAccepted')
		socket.off('invitationDeclined')
	})

</script>

<template>

	<div class="SideBar-content-wrap">
		<SideBarSwitch/>

		<SearchInput @search="(val) => toFind = val"/>

		<button
			v-if="sbStore.state.section == 2 && sbStore.state.channelsState == 1"
			class="Content-newChanBtn"
			@click="sbStore.newChan = true"
		>
			<span class="NewChanBtn-value">Create new channel</span>
		</button>

		<div class="SideBar-content" v-if="sbStore.state.section == 1">
			<SideBarTag
				v-for="(item, index) in data"
				:key="index"
				:type="sbStore.state.friendsState"
				:data="item"
				@click="profileRedirect(item.id || '')"
			/>
		</div>

		<div class="SideBar-content" v-if="sbStore.state.section == 2">
			<SideBarTag
				v-for="(item, index) in data"
				:key="index"
				:type="sbStore.state.channelsState"
				:data="item"
				@click="openConv(item.id)"
			/>
		</div>

		<div class="SideBar-content" v-if="sbStore.state.section == 3">
			<SideBarTag
				v-for="(item, index) in data"
				:key="index"
				:type="sbStore.state.notifsState"
				:data="item"
				@click="sbStore.state.notifsState !== 3 ? profileRedirect(item.id || '') : ''"
			/>
		</div>
	</div>

</template>
