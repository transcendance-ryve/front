<script setup lang="ts">

	import { ref, type Ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'
	import MatchHistory from './MatchHistory.vue'
	import useAxios from '@/request/axios'
	import router from '@/router'
	import { onBeforeRouteUpdate } from 'vue-router'

	const	contentStore = useContentStore()
	contentStore.state = 4
	console.log('rere')
	const	userStore = useUserStore()
	const	type: Ref = ref(1)
	let		user: Ref = ref(null)
	let		loadingData: Ref = ref(false)
	let		err: Ref = ref(null)

	//	il faut gerer le cas ou l'id n'existe pas
	const	getUser = async (id: string) => {

		// if (false) {
		if (id == userStore.me.id) {
			console.log('fuck')
			type.value = 1
			user.value = userStore.me
		}
		else {
			loadingData.value = true
			const	{ response, loading, error } = await useAxios(
				'get',
				'/users/profile/' + id
			)
			type.value = response.value.isFriend ? 2 : 3
			user.value = response.value.user
			loadingData.value = loading.value
			err.value = error.value
		}
	}

	getUser(router.currentRoute.value.params.id as string)

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

	onBeforeRouteUpdate((to, from) => {
		console.log('delete2')
		getUser(to.params.id as string)
	})

</script>

<template>

	<div class="mainContent-profile" v-if="!err && !loadingData">
		<ProfileTag
			:type="type"
			:user="user"
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
