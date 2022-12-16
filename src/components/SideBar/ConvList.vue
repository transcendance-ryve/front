<script setup lang="ts">

	import { ref, reactive, computed } from 'vue'
	import SwitchBtn from './SwitchBtn.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownList from './DropDownList.vue'
	import UserTag from './UserTag.vue'
	import { logoFriends, logoAdd } from '../../assets/logoSVG'

	const	sectionSelected = ref('Users')
	const	toFind = ref('')
	const	isAdmin = Math.floor(Math.random() * 2) == 0 ? false : true

	const	allUsers = reactive([
		'Karim',
		'Kylian',
		'Antoine',
		'Ousmane',
		'Kingsley',
		'Raphael',
		'Benjamin',
		'Theo',
		'Lucas',
		'Adrien',
		'Alphonse',
		'Steve',
		'Olivier'
	])

	const	bannedListData = reactive([
		{
			name: 'Karim'
		},
		{
			name: 'Kingsley'
		},
		{
			name: 'Antoine'
		}
	])

	const	pendingListData = reactive([
		{
			name: 'Adrien'
		},
		{
			name: 'Raphael'
		},
		{
			name: 'Lucas'
		},
		{
			name: 'Steve'
		}
	])

	const	adminListData = reactive([
		{
			name: 'Reda'
		},
		{
			name: 'Yohann'
		},
		{
			name: 'Vincent'
		},
		{
			name: 'Hedi'
		}
	])

	const	userListData = reactive([
		{
			name: 'Kylian'
		},
		{
			name: 'Ousmane'
		},
		{
			name: 'Alphonse'
		},
		{
			name: 'Olivier'
		},
		{
			name: 'Theo'
		},
		{
			name: 'Benjamin'
		}
	])

	const	bannedList = computed(() => {
		if (toFind.value)
			return bannedListData.filter(user => user.name.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return bannedListData
	})

	const	pendingList = computed(() => {
		if (toFind.value)
			return pendingListData.filter(user => user.name.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return pendingListData
	})

	const	adminList = computed(() => {
		if (toFind.value)
			return adminListData.filter(user => user.name.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return adminListData
	})

	const	userList = computed(() => {
		if (toFind.value)
			return userListData.filter(user => user.name.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return userListData
	})

	const	addList = computed(() => {
		if (toFind.value)
			return allUsers.filter(userName => userName.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return false
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
			<SearchInput
				:type="3"
				@search="(val) => toFind = val"
			/>
			<div class="ConvList-content" v-if="sectionSelected == 'Users'">
				<DropDownList
					v-if="bannedList.length"
					label="Banned"
					:list="bannedList"
					:admin="isAdmin"
				/>

				<DropDownList
					v-if="pendingList.length"
					label="Pending"
					:list="pendingList"
				/>

				<DropDownList
					v-if="adminList.length"
					label="Administrators"
					:list="adminList"
					:admin="isAdmin"
					:open="true"
				/>

				<DropDownList
					v-if="userList.length"
					label="Users"
					:list="userList"
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
					v-for="(userName, index) in addList"
					:key="index"
					:section="sectionSelected"
					:userName="userName"
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