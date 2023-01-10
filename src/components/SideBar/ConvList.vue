<script setup lang="ts">

	import { ref, reactive, computed } from 'vue'
	import SwitchBtn from './SwitchBtn.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownList from './DropDownList.vue'
	import UserTag from './UserTag.vue'
	import type { User } from './UserTag.vue'
	import { logoFriends, logoAdd } from '../../assets/logoSVG'

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

</template>