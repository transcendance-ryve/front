<script setup lang="ts">

	import { reactive } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'
	import MatchHistory from './MatchHistory.vue'
	import router from '@/router'
	import { onBeforeRouteUpdate } from 'vue-router'
	import	getUserProfile, { type userProfileData } from '../../requests/Profile/getUserProfile'

	const	contentStore = useContentStore()
	contentStore.state = 4

	const	data: userProfileData = reactive({
		user: null,
		type: 1,
		loadingData: false,
		err: null
	})

	//	il faut gerer le cas ou l'id n'existe pas
	getUserProfile(router.currentRoute.value.params.id as string, data)

	const	getStat = (index: number) => {
		if (index == 2) {
			const	ratio = data.user.loses == 0 ? data.user.wins : data.user.wins / data.user.loses
			return isNaN(ratio) ? 0 : ratio
		}
		const	stats = [
			'rankPoint',
			'played',
			'ratio',
			'wins',
			'loses',
		]
		return data.user[stats[index]]
	}

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
