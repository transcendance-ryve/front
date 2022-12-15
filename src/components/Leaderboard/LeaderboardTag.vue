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
			:userName="user.name"
			:level="user.level"
			:levelPerCent="user.levelPerCent"
		/>
		<div class="LeaderboardTag-StatWrap">
			<LeaderboardTagStat
				label="Ranked points"
				:value="user.rankedPoints"
			/>
			<LeaderboardTagStat
				label="Play count"
				:value="user.playCount"
			/>
			<LeaderboardTagStat
				label="Wins"
				:value="user.wins"
			/>
			<LeaderboardTagStat
				label="Defeats"
				:value="user.defeats"
			/>
		</div>
	</div>

</template>
