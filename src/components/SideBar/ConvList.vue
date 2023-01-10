<!-- <script setup lang="ts">

	import { ref, reactive, computed } from 'vue'
	import SwitchBtn from './SwitchBtn.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownList from './DropDownList.vue'
	import UserTag from './UserTag.vue'
	import type { User } from './UserTag.vue'
	import { logoFriends, logoAdd } from '../../assets/logoSVG'
	// import useAxios from '@/requests/useAxios'

	// useAxios('get', 'channels/users/')

	const	sectionSelected = ref('Users')
	const	toFind = ref('')
	const	isAdmin = Math.floor(Math.random() * 2) == 0 ? false : true

	const	allUsers: User[] = reactive([
		{id: '0', username: 'Karim', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Kylian', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Antoine', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Ousmane', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Kingsley', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Raphael', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Benjamin', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Theo', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Lucas', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Adrien', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Alphonse', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Steve', avatar: 'http://localhost:3000/default.png'},
		{id: '0', username: 'Olivier', avatar: 'http://localhost:3000/default.png'}
	])

	const	bannedListData: User[] = reactive([
		{
			id: '0', username: 'Karim', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Kingsley', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Antoine', avatar: 'http://localhost:3000/default.png'
		}
	])

	const	pendingListData: User[] = reactive([
		{
			id: '0', username: 'Adrien', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Raphael', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Lucas', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Steve', avatar: 'http://localhost:3000/default.png'
		}
	])

	const	adminListData: User[] = reactive([
		{
			id: '0', username: 'Reda', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Yohann', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Vincent', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Hedi', avatar: 'http://localhost:3000/default.png'
		}
	])

	const	userListData: User[] = reactive([
		{
			id: '0', username: 'Kylian', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Ousmane', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Alphonse', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Olivier', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Theo', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Benjamin', avatar: 'http://localhost:3000/default.png'
		}
	])

	const	bannedList = computed(() => {
		if (toFind.value)
			return bannedListData.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return bannedListData
	})

	const	pendingList = computed(() => {
		if (toFind.value)
			return pendingListData.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return pendingListData
	})

	const	adminList = computed(() => {
		if (toFind.value)
			return adminListData.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return adminListData
	})

	const	userList = computed(() => {
		if (toFind.value)
			return userListData.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return userListData
	})

	const	addList = computed(() => {
		if (toFind.value)
			return allUsers.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return []
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
					label="Banned"
					:users="bannedList"
					:admin="isAdmin"
				/>

				<DropDownList
					v-if="pendingList.length"
					label="Pending"
					:users="pendingList"
				/>

				<DropDownList
					v-if="adminList.length"
					label="Administrators"
					:users="adminList"
					:admin="isAdmin"
					:open="true"
				/>

				<DropDownList
					v-if="userList.length"
					label="Users"
					:users="userList"
					:admin="isAdmin"
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
				/>
				<span
					class="Content-noResult"
					v-if="toFind && !addList.length"
				>
					No results.
				</span>
			</div>
		</div>
	</div>

</template> -->





<script setup lang="ts">

	import { ref, reactive, computed, watch, type Ref, onMounted, toRefs } from 'vue'
	import SwitchBtn from './SwitchBtn.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownList from './DropDownList.vue'
	import UserTag from './UserTag.vue'
	import type { User } from './UserTag.vue'
	import { logoFriends, logoAdd } from '../../assets/logoSVG'
	import getUsers from '@/requests/SideBar/getUsers'
	import getUsersInChannel from '@/requests/SideBar/getUsersInChannel'
	import type { UserInChan } from '@/requests/SideBar/getUsersInChannel'
	import type { axiosState } from '@/requests/useAxios'
	import { useUserStore } from '@/stores/UserStore'

	export interface Props {
		id: string
	}

	const	props = defineProps<Props>()

	const	p = toRefs(props)

	const	userStore = useUserStore()
	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})
	const	sectionSelected = ref('Users')
	const	toFind = ref('')
	const	role: Ref<string> = ref('')

	const	usersInChannel: Ref<UserInChan[]> = ref([])

	const	addListData: Ref<User[]> = ref([])

	const	bannedListData: User[] = reactive([
		{
			id: '0', username: 'Karim', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Kingsley', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Antoine', avatar: 'http://localhost:3000/default.png'
		}
	])

	const	pendingListData: User[] = reactive([
		{
			id: '0', username: 'Adrien', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Raphael', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Lucas', avatar: 'http://localhost:3000/default.png'
		},
		{
			id: '0', username: 'Steve', avatar: 'http://localhost:3000/default.png'
		}
	])

	const	adminListData: Ref<User[]> = ref([])
	const	userListData: Ref<User[]> = ref([])
	// const	adminListData: User[] = reactive([
	// 	{
	// 		id: '0', username: 'Reda', avatar: 'http://localhost:3000/default.png'
	// 	},
	// 	{
	// 		id: '0', username: 'Yohann', avatar: 'http://localhost:3000/default.png'
	// 	},
	// 	{
	// 		id: '0', username: 'Vincent', avatar: 'http://localhost:3000/default.png'
	// 	},
	// 	{
	// 		id: '0', username: 'Hedi', avatar: 'http://localhost:3000/default.png'
	// 	}
	// ])

	// const	userListData: User[] = reactive([
	// 	{
	// 		id: '0', username: 'Kylian', avatar: 'http://localhost:3000/default.png'
	// 	},
	// 	{
	// 		id: '0', username: 'Ousmane', avatar: 'http://localhost:3000/default.png'
	// 	},
	// 	{
	// 		id: '0', username: 'Alphonse', avatar: 'http://localhost:3000/default.png'
	// 	},
	// 	{
	// 		id: '0', username: 'Olivier', avatar: 'http://localhost:3000/default.png'
	// 	},
	// 	{
	// 		id: '0', username: 'Theo', avatar: 'http://localhost:3000/default.png'
	// 	},
	// 	{
	// 		id: '0', username: 'Benjamin', avatar: 'http://localhost:3000/default.png'
	// 	}
	// ])

	const	bannedList = computed(() => {
		if (toFind.value)
			return bannedListData.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return bannedListData
	})

	const	pendingList = computed(() => {
		if (toFind.value)
			return pendingListData.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return pendingListData
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

	const	addUser = (user: User) => {
		pendingListData.unshift(user)
		addList.value.splice(addList.value.indexOf(user), 1)
	}

	const	isInvited = (user: User) => {
		for (let i = 0; i < pendingListData.length; i++)
			if (pendingListData[i].id === user.id)
				return true
		return false
	}

	watch(toFind, async () => {
		if (toFind.value && sectionSelected.value === 'Add') {
			addListData.value = await getUsers(toFind.value, dataState)
			addListData.value = addListData.value.filter(user => {
				return !isInvited(user) && user.id != userStore.me.id
			})
		}
	})

	const	getRole = () => {
		for (let i = 0; i < usersInChannel.value.length; i++) {
			if (usersInChannel.value[i].user.id === userStore.me.id)
				return usersInChannel.value[i].role
		}
		return ''
	}

	const	getLists = () => {
		for (let i = 0; i < usersInChannel.value.length; i++) {
			const	role = usersInChannel.value[i].role
			if (role === 'ADMIN' || role === 'OWNER')
				adminListData.value.push(usersInChannel.value[i].user)
			else
				userListData.value.push(usersInChannel.value[i].user)
		}
		return []
	}

	onMounted(async () => {
		usersInChannel.value = await getUsersInChannel(p.id.value, dataState)
		role.value = getRole()
		getLists()
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
					label="Banned"
					:users="bannedList"
					:admin="role === 'ADMIN' ? true : false"
					:owner="role === 'OWNER' ? true : false"
				/>

				<DropDownList
					v-if="pendingList.length"
					label="Pending"
					:users="pendingList"
				/>

				<DropDownList
					v-if="adminList.length"
					label="Administrators"
					:users="adminList"
					:admin="role === 'ADMIN' ? true : false"
					:owner="role === 'OWNER' ? true : false"
					:open="true"
				/>

				<DropDownList
					v-if="userList.length"
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