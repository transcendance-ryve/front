<script setup lang="ts">

	import UserInfos from '../Utils/UserInfos.vue'
	import LeaderboardTagStat from './LeaderboardTagStat.vue'

	defineProps({
		user: {
			type: Object
		}
	})

</script>

<template>

	<div class="LeaderboardTag">
		<span class="LeaderboardTag-rank">#{{ user.rank }}</span>
		<UserInfos
			:userName="user.userName"
			:level="user.level"
			:levelPerCent="user.levelProgression"
		/>
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
