<script setup lang="ts">

	import { withDefaults } from 'vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import { logoScore, logoScoreBlue, logoScoreRed } from '../../assets/logoSVG'
	import type { User } from '../../types'

	interface Props {
		user: User
		reverse: boolean
	}

	const	props = withDefaults(defineProps<Props>(), {
		reverse: false
	})

	const	userColor: string = props.reverse ? '#FF4646' : '#0177FB'

	const	logo = (index: number) => {
		if (index <= props.user.score)
			return props.reverse ? logoScoreRed : logoScoreBlue
		else
			return logoScore
	}

</script>

<template>

	<div
		class="VersusTag"
		:class="{'VersusTag--reverse': reverse}"
	>
		<UserInfos
			:avatar="user.avatar"
			:username="user.username"
			:level="user.level"
			:experience="user.experience"
			:nextLevel="user.next_level"
			:mainColor="userColor"
			:avatarBorder="true"
			:reverse="reverse"

		/>
		<div class="VersusTag-score">
			<span
				v-for="i in 5"
				:key="i"
				class="Score-logo"
				v-html="logo(i)">
			</span>
		</div>
	</div>

</template>
