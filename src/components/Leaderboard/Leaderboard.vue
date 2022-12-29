<!-- <script setup lang="ts">

	import { reactive, ref, computed, watch } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import LeaderboardTag from './LeaderboardTag.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoSort } from '../../assets/logoSVG'
	import PagesSelector from '../Utils/PagesSelector.vue'

	import users from '../../Users.json'

	const	contentStore = useContentStore()
	contentStore.state = 2

	const		order = ref('des')
	const		page = ref(1)
	const		dataIndex = ref(0)
	const		toFind = ref('')
	const		perPage = ref(12)

	const	dataSorted = computed(() => users.sort((a, b) => {
				if (order.value == 'des')
					return b.rankPoint - a.rankPoint
				else
					return a.rankPoint - b.rankPoint
			}
		)
	)

	const	inputRes = computed(() => {
		return dataSorted.value.filter(user => user.username.toLowerCase().includes(toFind.value.toLowerCase()))
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

	watch(pagesSize, newVal => {
		if (page.value > newVal)
			updatePage(newVal)
	})

</script>

<template>

	<div class="mainContent-leaderboard">
		<div class="Leaderboard-filters">
			<SearchInput
				inputBackground="#242635"
				inputHeight="56em"
				@search="(val) => toFind = val"
			/>
			<div class="Filters-menus">
				<DropDownMenu
					value="Per page:"
					:options="['12', '24', '36', '48']"
					width="165em"
					height="56em"
					:logo="logoPerPage"
					@select="(val) => perPage = parseInt(val)"
				/>
				<DropDownMenu
					value="Sort by:"
					:options="['Best rank', 'Worst rank']"
					width="205em"
					height="56em"
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
				:rank="order == 'des' ? index + 1 : usersToDisplay.length - index"
			/>
		</div>
		<PagesSelector
			:page="page"
			:pagesSize="pagesSize"
			@update="updatePage"
		/>
	</div>

</template> -->


<script setup lang="ts">

	import { reactive, ref, type Ref, computed, watch } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import LeaderboardTag from './LeaderboardTag.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoSort, logoDesc, logoAsc } from '../../assets/logoSVG'
	import PagesSelector from '../Utils/PagesSelector.vue'
	import getLeaderboard, { type leaderboardData, type leaderboardQueries } from '@/requests/Leaderboard/getLeaderboard'
	import router from '@/router/index'

	const	contentStore = useContentStore()
	contentStore.state = 2

	const	data: leaderboardData = reactive({
		users: [],
		usersCount: 0,
		loadingData: false,
		err: null
	})

	const	queries: leaderboardQueries = reactive({
		page: 1,
		take: 1,
		sort: '',
		order: 'des',
	})
	console.log('refresh')

	watch(queries, async newVal => {
		await router.replace({ path: router.currentRoute.value.fullPath, query: queries})
		getLeaderboard(data)
	})
	// router.replace({ path: router.currentRoute.value.fullPath, query: queries})
	// const	updateQuery = (qry: query, val: number | string) => {
	// 	qry.value = val
	// 	router.replace({ path: router.currentRoute.value.fullPath, query: { igo: 'asdf' }})
	// }

	const		toFind = ref('')

	getLeaderboard(data)

	const	pagesCount = computed(() => {
		let	res: number = Math.round(data.usersCount / queries.take)
		if (data.usersCount / queries.take > res)
			res++
		return res
	})

	const	updatePage = (n: number) => {
		queries.page = n
	}

	watch(pagesCount, newVal => {
		if (queries.page > newVal)
			updatePage(newVal)
	})

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
					value="Per page:"
					:options="['1', '24', '36', '48']"
					width="165em"
					height="56em"
					:logo="logoPerPage"
					@select="(val) => queries.take = parseInt(val)"
				/>
				<DropDownMenu
					value="Sort by:"
					:options="['Ranked Point', 'Play count', 'Wins', 'Defeats']"
					width="232em"
					height="56em"
					:logo="logoSort"
					@select="(val) => queries.sort = val"
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
				:rank="queries.order == 'des' ? index + 1 : data.usersCount - index"
			/>
		</div>
		<PagesSelector
			:page="queries.page"
			:pagesSize="pagesCount"
			@update="updatePage"
		/>
	</div>

</template>
