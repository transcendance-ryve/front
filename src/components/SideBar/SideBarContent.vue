<script setup lang="ts">

	import { reactive, ref, watch, computed, type Ref } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import SideBarSwitch from './SideBarSwitch.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import SideBarTag from './SideBarTag.vue'
	import { profileRedirect } from '@/router'
	import type { axiosState } from '@/requests/useAxios'
	import getFriends from '@/requests/Friends/getFriends'
	import getUsers from '@/requests/SideBar/getUsers'
	import getFriendsRequests from '@/requests/Friends/getFriendsRequests'
	import getMyChannels from '@/requests/SideBar/getMyChannels'
	import getChannelsNotifs from '@/requests/SideBar/getChannelsNotifs'

	export interface	contentData {
		id: string,			//	user			id
		avatar: string,		//	user / chan		avatar
		username: string,	//	user 			name
		name: string,		//	chan 			name
		status: string,		//	user / chan		status
		time: number,		//	user / chan		timer
		lastMsg: string,	//	user / chan		last message
		usersCount: number,		//	chan			users count
	}

	const	data4: Partial<contentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'RYVE',
			time: 1,
			status: 'PUBLIC',
			users: 4
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN1',
			time: 2,
			status: 'PROTECTED',
			users: 42
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN2',
			time: 3,
			status: 'PUBLIC',
			users: 14
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN3',
			time: 4,
			status: 'PUBLIC',
			users: 106
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN4',
			time: 5,
			status: 'PUBLIC',
			users: 8
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN5',
			time: 6,
			status: 'PROTECTED',
			users: 4000
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN6',
			time: 7,
			status: 'PUBLIC',
			users: 2
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN7',
			time: 8,
			status: 'PROTECTED',
			users: 7
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN8',
			time: 9,
			status: 'PUBLIC',
			users: 4
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN9',
			time: 10,
			status: 'PROTECTED',
			users: 21
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN10',
			time: 11,
			status: 'PUBLIC',
			users: 10
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN11',
			time: 12,
			status: 'PUBLIC',
			users: 18
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN12',
			time: 13,
			status: 'PUBLIC',
			users: 1
		},
	])

	const	data5: Partial<contentData>[] = reactive([
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

	const	contentData: Ref<Partial<contentData>[]> = ref([])

	const	getRawData = async () => {
		let	fetchData: Partial<contentData>[] = []

		if (sbStore.state.section == 1) {
			if (sbStore.state.friendsState == 1)
				fetchData = await getFriends(dataState)
			else if (toFind.value)
				fetchData = await getUsers(toFind.value, dataState)
		}
		else if (sbStore.state.section == 2) {
			if (sbStore.state.channelsState == 1)
				fetchData = await getMyChannels(dataState)
				// fetchData = data3
			else
				fetchData = data4
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
		sbStore.clearHiddenTags()
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
		if (toFind.value && (sbStore.state.section === 1 && sbStore.state.friendsState === 2))
			contentData.value = await getUsers(toFind.value, dataState)
	})

	const	data = computed(() => {
		if (dataState.error || dataState.loading)
			return
		if (toFind.value) {
			if (sbStore.state.section === 1 && sbStore.state.friendsState === 2)
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

	getRawData()

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
