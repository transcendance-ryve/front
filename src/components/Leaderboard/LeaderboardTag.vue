<script setup lang="ts">

	import UserInfos from '../Utils/UserInfos.vue'
	import LeaderboardTagStat from './LeaderboardTagStat.vue'
	import { useContentStore } from '../../stores/ContentStore'

	defineProps({
		user: {
			type: Object
		},
		rank: {
			type: Number,
			default: 0
		},
		selectValue: {
			type: [String, Boolean],
			default: false
		}
	})

	const	contentStore = useContentStore()

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
				:nextLevel="user.next_level"
			/>
		</div>
		<div class="LeaderboardTag-StatWrap">
			<LeaderboardTagStat
				:class="{'Stat--selected': selectValue === 'Rank points'}"
				label="Rank points"
				:value="user.rank_point"
			/>
			<LeaderboardTagStat
				:class="{'Stat--selected': selectValue === 'Play count'}"
				label="Play count"
				:value="user.played"
			/>
			<LeaderboardTagStat
				:class="{'Stat--selected': selectValue === 'Wins'}"
				label="Wins"
				:value="user.wins"
			/>
			<LeaderboardTagStat
				:class="{'Stat--selected': selectValue === 'Defeats'}"
				label="Defeats"
				:value="user.loses"
			/>
		</div>
	</div>

</template>
