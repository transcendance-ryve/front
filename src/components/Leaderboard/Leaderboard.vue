<script setup lang="ts">

	import { reactive, ref, computed, watch } from 'vue'
	import { useNavBarStore } from '../../stores/NavBarStore'
	import LeaderboardTag from './LeaderboardTag.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoSort } from '../../assets/logoSVG'
	import PagesSelector from '../Utils/PagesSelector.vue'

	import users from '../../Users.json'

	const	nbStore = useNavBarStore()
	nbStore.nbState = 2

	const		order = ref('des')
	const		page = ref(1)
	const		dataIndex = ref(0)
	const		toFind = ref('')
	const		perPage = ref(12)

	const	dataSorted = computed(() => users.sort((a, b) => {
				if (order.value == 'des')
					return a.rank - b.rank
				else
					return b.rank - a.rank
			}
		)
	)

	const	inputRes = computed(() => {
		return dataSorted.value.filter(user => user.userName.toLowerCase().includes(toFind.value.toLowerCase()))
	})

	const	usersToDisplay = computed(() => {
		if (toFind.value)
		{
			const	len = dataIndex.value + perPage.value < inputRes.value.length ?
				dataIndex.value + perPage.value : inputRes.value.length
			return inputRes.value.slice(dataIndex.value, len)
		}
		else {
			const	len = dataIndex.value + perPage.value < dataSorted.value.length ?
				dataIndex.value + perPage.value : dataSorted.value.length
			return dataSorted.value.slice(dataIndex.value, len)
		}
	})

	const	pagesSize = computed(() => {
		let	res = Math.round(users.length / perPage.value)
		if (users.length / perPage.value > res)
			res++
		return res
	})

	const	updatePage = (n: number) => {
		page.value = n
		dataIndex.value = (n - 1) * perPage.value
	}

</script>

<template>

	<div class="mainContent-leaderboard">
		<div class="Leaderboard-filters">
			<SearchInput
				inputBackground="#242635"
				inputHeight="56rem"
				@search="(val) => toFind = val"
			/>
			<div class="Filters-menus">
				<DropDownMenu
					value="Per page:"
					:options="['12', '24', '36', '48']"
					width="165rem"
					height="56rem"
					:logo="logoPerPage"
					@select="(val) => perPage = parseInt(val)"
				/>
				<DropDownMenu
					value="Sort by:"
					:options="['Best rank', 'Worst rank']"
					width="205rem"
					height="56rem"
					:logo="logoSort"
					@select="(val) => order = val == 'Best rank' ? 'des' : 'asc'"
				/>
			</div>
		</div>
		<div
			class="Leaderboard-content"
			:class="{'Leaderboard-content--maxSize': pagesSize == 1}"
		>
			<leaderboardTag
				v-for="(user, index) in usersToDisplay"
				:key=index
				:user="user"
			/>
		</div>
		<PagesSelector
			:page="page"
			:pagesSize="pagesSize"
			@update="updatePage"
		/>
	</div>

</template>
