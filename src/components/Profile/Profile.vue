<script setup lang="ts">

	import { reactive, watch } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useSideBarStore } from '@/stores/SideBarStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'
	import MatchHistory from './MatchHistory.vue'
	import router from '@/router'
	import { onBeforeRouteUpdate } from 'vue-router'
	import	getUserProfile, { type userProfileData } from '../../requests/Profile/getUserProfile'

	const	contentStore = useContentStore()
	contentStore.state = 4

	const	sbStore = useSideBarStore()

	const	data: userProfileData = reactive({
		user: null,
		type: 1,
		loadingData: false,
		err: null
	})

	//	404 for unknown id
	getUserProfile(router.currentRoute.value.params.id as string, data)

	const	getStat = (index: number) => {
		if (index == 2) {
			let	ratio: number = data.user.loses == 0 ? data.user.wins : data.user.wins / data.user.loses
			ratio = isNaN(ratio) ? 0 : ratio
			return Number.isInteger(ratio) ? ratio : parseFloat(ratio.toFixed(2))
		}
		const	stats = [
			'rank_point',
			'played',
			'ratio',
			'wins',
			'loses',
		]
		return data.user[stats[index]]
	}

	watch(sbStore.hiddenTags, () => {
		if (sbStore.state.section === 3 && sbStore.state.notifsState === 2 && sbStore.hiddenTags.includes(data.user.id))
			data.type = 2
	}) 

	onBeforeRouteUpdate((to, from) => {
		getUserProfile(to.params.id as string, data)
	})

</script>

<template>

	<div class="mainContent-profile" v-if="!data.err && !data.loadingData">
		<ProfileTag
			:type="data.type"
			:user="data.user"
		/>
		<div class="Profile-section">
			<h2 class="Section-name">Statistics</h2>
			<div class="StatisticsWrap">
				<ProfileStat
					v-for="n in 5"
					:key="n"
					:index="n - 1"
					:value="getStat(n - 1)"
				/>
			</div>
		</div>
		<div class="Profile-section">
			<h2 class="Section-name">Match History</h2>
			<MatchHistory />
		</div>
	</div>

</template>
