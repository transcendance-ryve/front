<script setup lang="ts">

	import { ref, reactive, computed, watch, type Ref, onMounted, toRefs, onUnmounted } from 'vue'
	import SwitchBtn from './SwitchBtn.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownList from './DropDownList.vue'
	import UserTag from './UserTag.vue'
	import type { IUserTag } from './UserTag.vue'
	import { logoFriends, logoAdd } from '../../assets/logoSVG'
	import getUsers from '@/requests/SideBar/getUsers'
	import getUsersInChannel from '@/requests/SideBar/getUsersInChannel'
	import type { UserInChan } from '@/requests/SideBar/getUsersInChannel'
	import type { axiosState } from '@/requests/useAxios'
	import { useUserStore } from '@/stores/UserStore'

	export interface Props {
		channelId: string
		role: string
	}

	const	props = defineProps<Props>()

	const	p = toRefs(props)

	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})
	const	sectionSelected = ref('Users')
	const	toFind = ref('')

	const	usersInChannel: Ref<IUserTag[]> = ref([])

	const	addListData: Ref<IUserTag[]> = ref([])

	const	bannedListData: Ref<IUserTag[]> = ref([
		{
			id: '0', username: 'Karim', avatar: 'http://localhost:3000/default.png', role: 'MEMBER', isMute: true, isBan: false
		},
		{
			id: '0', username: 'Kingsley', avatar: 'http://localhost:3000/default.png', role: 'MEMBER', isMute: false, isBan: true
		},
		{
			id: '0', username: 'Antoine', avatar: 'http://localhost:3000/default.png', role: 'MEMBER', isMute: false, isBan: false
		}
	])

	const	pendingListData: Ref<IUserTag[]> = ref([
		{
			id: '0', username: 'Adrien', avatar: 'http://localhost:3000/default.png', role: 'MEMBER', isMute: false, isBan: false
		},
		{
			id: '0', username: 'Raphael', avatar: 'http://localhost:3000/default.png', role: 'MEMBER', isMute: false, isBan: false
		},
		{
			id: '0', username: 'Lucas', avatar: 'http://localhost:3000/default.png', role: 'MEMBER', isMute: false, isBan: false
		},
		{
			id: '0', username: 'Steve', avatar: 'http://localhost:3000/default.png', role: 'MEMBER', isMute: false, isBan: false
		}
	])

	const	adminListData: Ref<IUserTag[]> = ref([])
	const	userListData: Ref<IUserTag[]> = ref([])

	const	bannedList = computed(() => {
		if (toFind.value)
			return bannedListData.value.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return bannedListData.value
	})

	const	pendingList = computed(() => {
		if (toFind.value)
			return pendingListData.value.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return pendingListData.value
	})

	const	adminList = computed(() => {
		if (toFind.value)
			return adminListData.value.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return adminListData.value
	})

	const	userList = computed(() => {
		if (toFind.value)
			return userListData.value.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return userListData.value
	})

	const	addList = computed(() => {
		if (toFind.value)
			return addListData.value
		else
			return []
	})

	const	addUser = (id: string) => {
		socket.emit('inviteToRoom', { inviteInfo: { channelId: p.channelId.value, friendId: id } })
	}

	const	isInChan = (user: IUserTag) => {
		if (bannedListData.value.find((u: IUserTag) => u.id === user.id) !== undefined)
			return true
		if (pendingListData.value.find((u: IUserTag) => u.id === user.id) !== undefined)
			return true
		if (adminListData.value.find((u: IUserTag) => u.id === user.id) !== undefined)
			return true
		if (userListData.value.find((u: IUserTag) => u.id === user.id) !== undefined)
			return true
		return false
	}

	watch(toFind, async () => {
		if (toFind.value && sectionSelected.value === 'Add') {
			addListData.value = await getUsers(toFind.value, dataState)
			addListData.value = addListData.value.filter(user => {
				return !isInChan(user)
			})
		}
	})

	const	getLists = () => {
		for (let i = 0; i < usersInChannel.value.length; i++) {
			const	user = usersInChannel.value[i]
			if (user.role === 'ADMIN' || user.role === 'OWNER')
				adminListData.value.push(user)
			else
				userListData.value.push(user)
		}
	}

	onMounted(async () => {
		usersInChannel.value = await getUsersInChannel(p.channelId.value, dataState)
		console.log(usersInChannel.value)
		getLists()
		socket.on('invitationSent', (target: IUserTag) => {
			pendingListData.value.push(target)
			addListData.value.splice(addListData.value.indexOf(target), 1)
		})
		socket.on('userPromoted', (target: IUserTag) => {
			adminListData.value.push(target)
			userListData.value.splice(userListData.value.indexOf(target), 1)
		})
		socket.on('userDemoted', (target: IUserTag) => {
			userListData.value.push(target)
			adminListData.value.splice(userListData.value.indexOf(target), 1)
		})
		socket.on('userMuted', (id: string) => {
			const	userMuted: IUserTag | undefined = userListData.value.find((user: IUserTag) => user.id === id)
			if (userMuted)
				userMuted.isMute = true
		})
	})

	onUnmounted(() => {
		socket.off('invitationSent')
		socket.off('userPromoted')
	})

</script>

<template>

	<div class="ConvList">
		<div class="ConvList-switch">
			<SwitchBtn
				value="Users"
				:selected="sectionSelected == 'Users'"
				:logo="logoFriends"
				height="44em"
				@click="sectionSelected = 'Users'"
			/>
			<SwitchBtn
				value="Add"
				:selected="sectionSelected == 'Add'"
				:logo="logoAdd"
				height="44em"
				@click="sectionSelected = 'Add'"
			/>
		</div>
		<div class="ConvList-contentWrap">
			<SearchInput @search="(val) => toFind = val"/>
			<div class="ConvList-content" v-if="sectionSelected == 'Users'">
				<DropDownList
					v-if="bannedList.length"
					:channelId="channelId"
					label="Banned"
					:users="bannedList"
					:admin="role === 'ADMIN' ? true : false"
					:owner="role === 'OWNER' ? true : false"
				/>

				<DropDownList
					v-if="pendingList.length"
					:channelId="channelId"
					label="Pending"
					:users="pendingList"
				/>

				<DropDownList
					v-if="adminList.length"
					:channelId="channelId"
					label="Administrators"
					:users="adminList"
					:admin="role === 'ADMIN' ? true : false"
					:owner="role === 'OWNER' ? true : false"
					:open="true"
				/>

				<DropDownList
					v-if="userList.length"
					:channelId="channelId"
					label="Users"
					:users="userList"
					:admin="role === 'ADMIN' ? true : false"
					:owner="role === 'OWNER' ? true : false"
					:open="true"
				/>

				<span
					class="Content-noResult"
					v-if="toFind && !bannedList.length &&
					!pendingList.length && !adminList.length && !userList.length"
				>
					No results.
				</span>
			</div>
			<div class="ConvList-content ConvList-content--add" v-if="sectionSelected == 'Add'">
				<UserTag
					v-for="(user, index) in addList"
					:key="index"
					:section="sectionSelected"
					:user="user"
					@add="addUser"
				/>
				<span
					class="Content-noResult"
					v-if="toFind && !dataState.loading && !addList.length"
				>
					No results.
				</span>
			</div>
		</div>
	</div>

</template>