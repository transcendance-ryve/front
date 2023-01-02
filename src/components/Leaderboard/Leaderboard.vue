<script setup lang="ts">

	import { reactive, ref, type Ref, computed, watch } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import LeaderboardTag from './LeaderboardTag.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoSort, logoDesc, logoAsc } from '../../assets/logoSVG'
	import PagesSelector from '../Utils/PagesSelector.vue'
	import { getQueriesInUrl, replaceUrl, getLeaderboard, type leaderboardData, type leaderboardQueries, type queriesKeys } from '@/requests/Leaderboard/getLeaderboard'
	import router from '@/router/index'
	import {type LocationQuery, onBeforeRouteUpdate } from 'vue-router'

	const	contentStore = useContentStore()
	contentStore.state = 2
	const	toFind: Ref<string> = ref('')
	const	menuTake: string[] = ['10', '20', '50', '100']
	const	menuSort: string[] = ['Rank points', 'Play count', 'Wins', 'Defeats']

	const	data: leaderboardData = reactive({
		users: [],
		count: 0,
		loadingData: false,
		err: null
	})

	const	queries: leaderboardQueries = reactive({
		page: '1',
		take: '10',
		sort: 'rankPoint',
		order: 'des',
		search: ''
	})

	const	getQueries = (urlQueries: LocationQuery) => {
		const	queriesNames: queriesKeys[] = ['page', 'take', 'sort', 'order', 'search']

		for (let i: number = 0; i < queriesNames.length; i++) {
			const	val = urlQueries[queriesNames[i]] as string
			if (val)
				queries[queriesNames[i]] = val
		}
	}

	const	getSortQuery = (value: string) => {
		if (value === 'Rank points')
			queries.sort = 'rankPoint'
		else if (value === 'Play count')
			queries.sort = 'played'
		else if (value === 'Wins')
			queries.sort = 'wins'
		else if (value === 'Defeats')
			queries.sort = 'loses'
	}

	const	getSortName = (value: string) => {
		if (value === 'rankPoint')
			return 'Rank points'
		else if (value === 'played')
			return 'Play count'
		else if (value === 'wins')
			return 'Wins'
		else if (value === 'loses')
			return 'Defeats'
	}

	const	checkQueries = () => {
		const	page: number = parseInt(queries.page)
		const	sortQueries = ['rankPoint', 'played', 'wins', 'loses']
		if (isNaN(page) || page < 1)
			queries.page = '1'
		if (!menuTake.includes(queries.take)) {
			const	takeVal: number = parseInt(queries.take)
			if (isNaN(takeVal) || takeVal < 1)
			queries.take = '10'
			else if (takeVal > 100)
			queries.take = '100'
		}
		if (!sortQueries.includes(queries.sort))
			queries.sort = 'rankPoint'
		if (queries.order !== 'des' && queries.order !== 'asc')
			queries.order = 'des'
	}

	const	getRank = (index: number) => {
		const	skipUsersCount: number = (parseInt(queries.take) * (parseInt(queries.page) - 1))
		if (queries.order === 'des')
			return index + 1 + skipUsersCount
		else
			return data.count - index - skipUsersCount
	}

	const	pagesCount = computed(() => {
		const	takeValue = parseInt(queries.take)
		let	res: number = Math.round(data.count / takeValue)
		if (data.count / takeValue > res)
			res++
		return res
	})

	const	updatePage = (n: number) => {
		queries.page = n.toString()
	}

	watch(toFind, () => {
		queries.search = toFind.value
	})

	let	block = false
	watch(queries, async () => {
		console.log('watch', queries)
		if (!block)
			await replaceUrl(JSON.parse(JSON.stringify(queries)))
	})

	watch(pagesCount, newVal => {
		if (parseInt(queries.page!) > newVal)
			updatePage(newVal)
	})

	onBeforeRouteUpdate(async (to, from) => {
			console.log('queries in bedpre', router.currentRoute.value.query)
			block = true
			if (to.query !== from.query) {
				console.log('query update in before')
				getQueries(to.query)
				checkQueries() // ?
			}
			// block = false
			// to query
			await getLeaderboard(getQueriesInUrl(to.fullPath), data)
			block = false
	})

	getQueries(router.currentRoute.value.query)
	checkQueries()
	getLeaderboard(getQueriesInUrl(router.currentRoute.value.fullPath), data)

</script>

<template>

	<div class="mainContent-leaderboard">
		<div class="Leaderboard-filters">
			<SearchInput
				inputBackground="#242635"
				inputHeight="56em"
				@search="(val) => toFind = val"
			/>
			<div class="Filters">
				<DropDownMenu
					label="Per page:"
					:options="menuTake"
					:selectValue="queries.take"
					width="165em"
					height="56em"
					:logo="logoPerPage"
					@select="(value) => queries.take = value"
				/>
				<DropDownMenu
					label="Sort by:"
					:options="menuSort"
					:selectValue="getSortName(queries.sort)"
					width="232em"
					height="56em"
					:logo="logoSort"
					@select="getSortQuery"
				/>
				<div class="Filters-orderBtns">
					<button
						class="OrderBtn"
						:class="{'OrderBtn--selected': queries.order == 'des'}"
						@click="queries.order ='des'"
					>
						<span class="OrderBtn-logo" v-html="logoDesc"></span>
					</button>
					<button
						class="OrderBtn"
						:class="{'OrderBtn--selected': queries.order == 'asc'}"
						@click="queries.order = 'asc'"
					>
						<span class="OrderBtn-logo" v-html="logoAsc"></span>
					</button>
				</div>
			</div>
		</div>
		<div
			v-if="!data.err && !data.loadingData"
			class="Leaderboard-content"
			:class="{'Leaderboard-content--maxSize': pagesCount == 1}"
		>
			<leaderboardTag
				v-for="(user, index) in data.users"
				:key=index
				:user="user"
				:rank="getRank(index)"
			/>
		</div>
		<PagesSelector
			v-if="!data.err && !data.loadingData"
			:page="parseInt(queries.page)"
			:pagesSize="pagesCount"
			@update="updatePage"
		/>
	</div>

</template>