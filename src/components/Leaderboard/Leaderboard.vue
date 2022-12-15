<script setup lang="ts">

	import { reactive, ref, computed, watch } from 'vue'
	import { useNavBarStore } from '../../stores/NavBarStore'
	import LeaderboardTag from './LeaderboardTag.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoSort } from '../../assets/logoSVG'
	import PagesSelector from '../Utils/PagesSelector.vue'

	const	nbStore = useNavBarStore()
	nbStore.nbState = 2

	const	data = reactive([
		{
			name: 'Karim',
			rank: 1,
			level: 200,
			levelPerCent: 12,
			rankedPoints: 21539,
			playCount: 304,
			wins: 290,
			defeats: 14
		},
		{
			name: 'Kylian',
			rank: 2,
			level: 197,
			levelPerCent: 66,
			rankedPoints: 16438,
			playCount: 300,
			wins: 270,
			defeats: 30
		},
		{
			name: 'Antoine',
			rank: 3,
			level: 158,
			levelPerCent: 20,
			rankedPoints: 13949,
			playCount: 325,
			wins: 232,
			defeats: 93
		},
		{
			name: 'Ousmane',
			rank: 4,
			level: 152,
			levelPerCent: 95,
			rankedPoints: 11203,
			playCount: 257,
			wins: 180,
			defeats: 77
		},
		{
			name: 'Kingsley',
			rank: 5,
			level: 140,
			levelPerCent: 32,
			rankedPoints: 6041,
			playCount: 432,
			wins: 234,
			defeats: 148
		},
		{
			name: 'Raphael',
			rank: 6,
			level: 134,
			levelPerCent: 84,
			rankedPoints: 5926,
			playCount: 123,
			wins: 120,
			defeats: 144
		},
		{
			name: 'Benjamin',
			rank: 7,
			level: 104,
			levelPerCent: 8,
			rankedPoints: 5720,
			playCount: 231,
			wins: 143,
			defeats: 1345
		},
		{
			name: 'Theo',
			rank: 8,
			level: 100,
			levelPerCent: 71,
			rankedPoints: 5477,
			playCount: 154,
			wins: 553,
			defeats: 235
		},
		{
			name: 'Lucas',
			rank: 9,
			level: 84,
			levelPerCent: 60,
			rankedPoints: 5476,
			playCount: 5426,
			wins: 234,
			defeats: 3652
		},
		{
			name: 'Adrien',
			rank: 10,
			level: 78,
			levelPerCent: 89,
			rankedPoints: 5093,
			playCount: 1234,
			wins: 3251,
			defeats: 1245
		},
		{
			name: 'Alphonse',
			rank: 11,
			level: 43,
			levelPerCent: 37,
			rankedPoints: 4201,
			playCount: 1234,
			wins: 23,
			defeats: 1244
		},
		{
			name: 'Steve',
			rank: 12,
			level: 21,
			levelPerCent: 21,
			rankedPoints: 3619,
			playCount: 12,
			wins: 12,
			defeats: 0
		},
		{
			name: 'Olivier',
			rank: 13,
			level: 1,
			levelPerCent: 58,
			rankedPoints: 305,
			playCount: 3252,
			wins: 0,
			defeats: 3252
		},
	])

	const		order = ref('des')
	const		page = ref(1)
	const		dataIndex = ref(0)
	const		toFind = ref('')
	const		perPage = ref(12)

	const	dataSorted = computed(() => data.sort((a, b) => {
				if (order.value == 'des')
					return a.rank - b.rank
				else
					return b.rank - a.rank
			}
		)
	)

	const	inputRes = computed(() => {
		return dataSorted.value.filter(user => user.name.toLowerCase().includes(toFind.value.toLowerCase()))
	})

	const	users = computed(() => {
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
		let	res = Math.round(data.length / perPage.value)
		if (data.length / perPage.value > res)
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
				v-for="(user, index) in users"
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
