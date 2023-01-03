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
		},
		selectValue: {
			type: [String, Boolean],
			default: false
		}
	})

	const	contentStore = useContentStore()

	const	profileRedirect = (id: number) => {
		const	profilePath :string = '/profile/' + id
		router.push({ path:profilePath })
		contentStore.state = 4
	}

</script>

<template>

	<div class="LeaderboardTag" @click="profileRedirect(user.id)">
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
			/>
		</div>
		<div class="LeaderboardTag-StatWrap">
			<LeaderboardTagStat
				:class="{'Stat--selected': selectValue === 'Rank points'}"
				label="Rank points"
				:value="user.rankPoint"
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
