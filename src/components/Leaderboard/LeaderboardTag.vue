<script setup lang="ts">

	import UserInfos from '../Utils/UserInfos.vue'
	import LeaderboardTagStat from './LeaderboardTagStat.vue'
	import { useProfileStore } from '../../stores/ProfileStore'
	import { useContentStore } from '../../stores/ContentStore'

	defineProps({
		user: {
			type: Object
		}
	})

	const	profileStore = useProfileStore()
	const	contentStore = useContentStore()

	const	profileRedirect = (user: object) => {
		profileStore.setProfile(user, 2)
		contentStore.state = 5
	}

</script>

<template>

	<div class="LeaderboardTag">
		<div class="LeaderboardTag-user">
			<div class="LeaderboardTag-rank">
				<span class="Rank-value">#{{ user.rank }}</span>
			</div>
			<UserInfos
				:userName="user.userName"
				:level="user.level"
				:levelPerCent="user.levelProgression"
				@click="profileRedirect(user)"
			/>
		</div>
		<div class="LeaderboardTag-StatWrap">
			<LeaderboardTagStat
				label="Ranked points"
				:value="user.stats.rankingPoints"
			/>
			<LeaderboardTagStat
				label="Play count"
				:value="user.stats.playCount"
			/>
			<LeaderboardTagStat
				label="Wins"
				:value="user.stats.wins"
			/>
			<LeaderboardTagStat
				label="Defeats"
				:value="user.stats.defeats"
			/>
		</div>
	</div>

</template>
