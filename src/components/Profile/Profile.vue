<script setup lang="ts">

	import { ref, type Ref, watch } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'
	import MatchHistory from './MatchHistory.vue'
	import useAxios from '@/request/axios'
	import router from '@/router'
	import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'

	const	contentStore = useContentStore()
	contentStore.state = 4
	console.log('rere')
	const	userStore = useUserStore()
	const	type: Ref = ref(1)
	let		user: Ref = ref(null)
	let		loadingData: Ref = ref(false)

	watch(loadingData, newVal => {
		console.log('okokokok', newVal)
		if (newVal == false) {
			console.log('setItem')
			localStorage.setItem('profile', JSON.stringify(user.value))
		}
	})

	// il faut gerer le cas ou l'id n'existe pas
	const	getUser = async () => {
		const	profile = localStorage.getItem('profile')
		user.value = profile ? JSON.parse(profile) : null
		if (!user.value || user.value.id != router.currentRoute.value.params.id) {
			if (false) {
			// if (router.currentRoute.value.params.id == userStore.me.id) {
				console.log('fuck')
				user = userStore.me
			}
			else {
				type.value = 2
				loadingData.value = true
				const	{ response, loading, error } = await useAxios(
					'get',
					'/users/' + router.currentRoute.value.params.id
				)
				console.log('off')
				user.value = response.value
				loadingData.value = loading.value
			}
		}
	}

	getUser()

	const	getStat = (index: number) => {
		if (index == 2) {
			const	ratio = user.value.loses == 0 ? user.value.wins : user.value.wins / user.value.loses
			return isNaN(ratio) ? 0 : ratio
		}
		const	stats = [
			'rankPoint',
			'played',
			'ratio',
			'wins',
			'loses',
		]
		return user.value[stats[index]]
	}

	onBeforeRouteLeave((to, from) => {
		console.log('delete1')
		localStorage.removeItem('profile')
	})

	onBeforeRouteUpdate((to, from) => {
		console.log('delete2')
		getUser()
		// localStorage.removeItem('profile')
	})

</script>

<template>

	<div class="mainContent-profile" v-if="!loadingData">
		<ProfileTag
			:type="type"
			:user="user"
		/>
		<div class="Profile-section">
			<h2 class="Section-name">Statistics</h2>
			<!-- <div class="StatisticsWrap">
				<ProfileStat
					v-for="(stat, name, index) in profile.stats"
					:key="name"
					:index="index"
					:value="stat"
				/>
			</div> -->
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
