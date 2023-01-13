<script setup lang="ts">

	import UserInfos from '../Utils/UserInfos.vue'
	import LeaderboardTagStat from './LeaderboardTagStat.vue'
	import type { User } from '@/types/User'
	import { withDefaults } from 'vue'

	interface props {
		user: User
		rank: number
		selectValue: string | boolean
	}

	withDefaults(defineProps<props>(), {
		rank: 0,
		selectValue: false
	})

</script>

<template>

	<div class="LeaderboardTag">
		<div class="LeaderboardTag-user">
			<div class="LeaderboardTag-rank">
				<span class="Rank-value">#{{ rank }}</span>
			</div>
			<UserInfos :user="user" />
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
