<script setup lang="ts">

	import UserInfos from '../Utils/UserInfos.vue'
	import LeaderboardTagStat from './LeaderboardTagStat.vue'
	import { useContentStore } from '../../stores/ContentStore'
	import router from '../../router/index'

	defineProps({
		user: {
			type: Object
		},
		rank: {
			type: Number,
			default: 0
		}
	})

	const	contentStore = useContentStore()

	const	profileRedirect = (user: any) => {
		const	profilePath :string = '/profile/' + user.id
		router.push({ path:profilePath })
		contentStore.state = 4
	}

</script>

<template>

	<div class="LeaderboardTag">
		<div class="LeaderboardTag-user">
			<div class="LeaderboardTag-rank">
				<span class="Rank-value">#{{ rank }}</span>
			</div>
			<UserInfos
				:avatar="user.avatar"
				:username="user.username"
				:level="user.level"
				:experience="user.experience"
				:nextLevel="user.nextLevel"
				@click="profileRedirect(user)"
			/>
		</div>
		<div class="LeaderboardTag-StatWrap">
			<LeaderboardTagStat
				label="Ranked points"
				:value="user.rankPoint"
			/>
			<LeaderboardTagStat
				label="Play count"
				:value="user.played"
			/>
			<LeaderboardTagStat
				label="Wins"
				:value="user.wins"
			/>
			<LeaderboardTagStat
				label="Defeats"
				:value="user.loses"
			/>
		</div>
	</div>

</template>
