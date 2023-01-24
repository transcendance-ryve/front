<script setup lang="ts">

	import { reactive, computed, watch, onMounted, nextTick } from 'vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoDesc, logoAsc } from '../../assets/logoSVG'
	import VersusTag from '../Spectate/VersusTag.vue'
	import LoaderSpinner from '../Utils/LoaderSpinner.vue'
	import PagesSelector from '../Utils/PagesSelector.vue'
	import router, { profileRedirect } from '@/router/index'
	import type { MatchHistoryData, MatchHistoryQueries, queriesKeys } from '@/types/MatchHistory'
	import { type LocationQuery, onBeforeRouteUpdate } from 'vue-router'
	import { getMatchHistory, getQueriesInUrl, replaceUrl } from '@/requests/Profile/getMatchHistory'

	interface props {
		userId: string
	}

	const	props = defineProps<props>()
	const	menuTake: string[] = ['10', '20', '50', '100']
	let		routeUpdating: boolean = false

	const	data: MatchHistoryData = reactive({
		games: [],
		count: 0,
		loadingData: false,
		err: null
	})

	const	queries: MatchHistoryQueries = reactive({
		page: '1',
		take: '10',
		order: 'desc',
		search: '',
	})

	const	getUrlQueries = (urlQueries: LocationQuery) => {
		const	queriesNames: queriesKeys[] = ['page', 'take', 'order', 'search']

		for (let i: number = 0; i < queriesNames.length; i++) {
			const	val: string = urlQueries[queriesNames[i]] as string
			queries[queriesNames[i]] = val ? val : ''
		}
	}

	const	checkQueries = () => {
		const	page: number = parseInt(queries.page)
		if (isNaN(page) || page < 1)
			queries.page = '1'
		if (!menuTake.includes(queries.take)) {
			const	takeVal: number = parseInt(queries.take)
			if (isNaN(takeVal) || takeVal < 1)
				queries.take = '10'
			else if (takeVal > 100)
				queries.take = '100'
		}
		if (queries.order !== 'desc' && queries.order !== 'asc')
			queries.order = 'desc'
	}

	const	pagesCount = computed(() => {
		const	takeValue = parseInt(queries.take)
		let	res: number = Math.round(data.count / takeValue)
		if (data.count / takeValue > res)
			res++
		return res
	})

	const	updatePage = (n: number) => {
		const	page: string = n.toString()
		page ? queries.page = page : queries.page = '1'
	}

	watch(queries, async () => {
		if (!routeUpdating) 
			await replaceUrl({...queries})
	})

	watch(pagesCount, newVal => {
		if (parseInt(queries.page) > newVal)
			updatePage(newVal)
	})

	onBeforeRouteUpdate(async (to, from) => {
		if (Object.keys(to.query).length === 0)
			return false
		routeUpdating = true
		if (to.query !== from.query)
			getUrlQueries(to.query)
		getMatchHistory(getQueriesInUrl(to.fullPath), to.params.id as string, data)
		await nextTick()
		routeUpdating = false
	})

	onMounted(async () => {
		getUrlQueries(router.currentRoute.value.query)
		checkQueries()
		await getMatchHistory(getQueriesInUrl(router.currentRoute.value.fullPath), props.userId, data)
	})

</script>

<template>

	<div class="MatchHistory">
		<div class="MatchHistory-filters">
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
		<div v-if="!data.err" class="MatchHistory-content">
			<div
				class="Content-Versus"
				v-for="(game, index) in data.games"
				:key=index
			>
				<VersusTag
					:class="{'VersusTag--opponent': game.left.id !== props.userId}"
					:player="game.left"
					@click="profileRedirect(game.left.id || '')"
				/>
				<VersusTag
					:class="{'VersusTag--opponent': game.right.id !== props.userId}"
					:player="game.right"
					:reverse="true"
					@click="profileRedirect(game.right.id || '')"
				/>
			</div>
			<LoaderSpinner size="30em" v-if="data.loadingData"/>
			<span
				class="Content-noResult"
				v-if="queries.search && !data.loadingData && !data.err && !data.games.length"
			>
				No results
			</span>
		</div>
		<PagesSelector
			v-if="!data.err && !data.loadingData && data.games.length"
			:page="parseInt(queries.page)"
			:pagesSize="pagesCount"
			@update="updatePage"
		/>
	</div>

</template>
