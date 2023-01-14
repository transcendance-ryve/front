<script setup lang="ts">

	import { reactive, ref, type Ref, computed, watch } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import LeaderboardTag from './LeaderboardTag.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoSort, logoDesc, logoAsc } from '../../assets/logoSVG'
	import PagesSelector from '../Utils/PagesSelector.vue'
	import { getQueriesInUrl, replaceUrl, getLeaderboard } from '@/requests/Leaderboard/getLeaderboard'
	import type { leaderboardData, leaderboardQueries, queriesKeys } from '@/types/Leaderboard'
	import router, { profileRedirect } from '@/router/index'
	import {type LocationQuery, onBeforeRouteUpdate } from 'vue-router'

	const	contentStore: any = useContentStore()
	contentStore.state = 2

	const	menuTake: string[] = ['10', '20', '50', '100']
	const	menuSort: string[] = ['Rank points', 'Play count', 'Wins', 'Defeats']
	let		routeUpdating: boolean = false

	const	data: leaderboardData = reactive({
		users: [],
		count: 0,
		loadingData: false,
		err: null
	})

	const	queries: leaderboardQueries = reactive({
		page: '1',
		take: '10',
		sort: 'rank_point',
		order: 'desc',
		search: ''
	})

	const	getUrlQueries = (urlQueries: LocationQuery) => {
		const	queriesNames: queriesKeys[] = ['page', 'take', 'sort', 'order', 'search']

		for (let i: number = 0; i < queriesNames.length; i++) {
			const	val = urlQueries[queriesNames[i]] as string
			if (val)
				queries[queriesNames[i]] = val
			else
				queries[queriesNames[i]] = ''
		}
	}

	const	getSortQuery = (value: string) => {
		if (value === 'Rank points')
			queries.sort = 'rank_point'
		else if (value === 'Play count')
			queries.sort = 'played'
		else if (value === 'Wins')
			queries.sort = 'wins'
		else if (value === 'Defeats')
			queries.sort = 'loses'
	}

	const	getSortName = (value: string) => {
		if (value === 'rank_point')
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
		const	sortQueries = ['rank_point', 'played', 'wins', 'loses']
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
			queries.sort = 'rank_point'
		if (queries.order !== 'desc' && queries.order !== 'asc')
			queries.order = 'desc'
	}

	const	getRank = (index: number) => {
		const	skipUsersCount: number = (parseInt(queries.take) * (parseInt(queries.page) - 1))
		if (queries.order === 'desc')
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
		if (queries.page === '0')
			queries.page = '1'
	}

	watch(queries, async () => {
		if (!routeUpdating)
			await replaceUrl(JSON.parse(JSON.stringify(queries)))
	})

	watch(pagesCount, newVal => {
		if (parseInt(queries.page) > newVal)
			updatePage(newVal)
	})

	onBeforeRouteUpdate(async (to, from) => {
		if (to.fullPath === '/leaderboard')
			return false
		routeUpdating = true
		if (to.query !== from.query)
			getUrlQueries(to.query)
		await getLeaderboard(getQueriesInUrl(to.fullPath), data)
		routeUpdating = false
	})

	getUrlQueries(router.currentRoute.value.query)
	checkQueries()
	getLeaderboard(getQueriesInUrl(router.currentRoute.value.fullPath), data)

</script>

<template>

	<div class="mainContent-leaderboard">
		<div class="Leaderboard-filters">
			<SearchInput
				:defaultValue="queries.search"
				inputBackground="#242635"
				inputHeight="56em"
				@search="(val) => queries.search = val"
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
						:class="{'OrderBtn--selected': queries.order === 'desc'}"
						@click="queries.order ='desc'"
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
				:selectValue="getSortName(queries.sort)"
				@click="profileRedirect(user.id)"
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