<script setup lang="ts">

	import { ref, type Ref, computed, type ComputedRef } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'
	import MatchHistory from './MatchHistory.vue'
	import useAxios from '@/request/axios'
	import router from '@/router'
	import { onBeforeRouteLeave } from 'vue-router'

	const	contentStore = useContentStore()
	contentStore.state = 4

	const	userStore = useUserStore()
	const	type: Ref = ref(1)
	let		profile: Ref = ref(null)
	let		loadingData: Ref = ref(true)

	const	getProfile = async () => {
		if (false) {
		// if (router.currentRoute.value.params.id == userStore.me.id) {
			console.log('fuck')
			profile = userStore.me
		}
		else {
			type.value = 2
			const	{ response, loading, error } = await useAxios(
				'get',
				'/users/' + router.currentRoute.value.params.id
			)
			console.log('off')
			profile.value = response.value
			loadingData.value = loading.value
		}
	}

	getProfile()

	// onBeforeRouteLeave

</script>

<template>

	<div class="mainContent-profile" v-if="!loadingData">
		<ProfileTag
			:type="type"
			:user="profile"
		/>
		<div class="Profile-section">
			<h2 class="Section-name">Statistics</h2>
			<!-- <div class="StatisticsWrap">
				<ProfileStat
					v-for="(stat, name, index) in profile.stats"
					:key="name"
					:ind="index"
					:value="stat"
				/>
			</div> -->
		</div>
		<div class="Profile-section">
			<h2 class="Section-name">Match History</h2>
			<MatchHistory />
		</div>
	</div>

</template>
