<script setup lang="ts">

	import { toRef, toRefs, computed } from 'vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import { logoScore, logoScoreBlue, logoScoreRed } from '../../assets/logoSVG'

	const	props = defineProps({
		user: {
			type: Object
		},
		reverse: {
			type: Boolean,
			default: false
		}
	})

	const	p = toRefs(props)

	const	userColor = p.reverse.value ? '#FF4646' : '#0177FB'

	const	logo = (index: number) => {
		if (index <= p.user?.value?.score)
			return p.reverse.value ? logoScoreRed : logoScoreBlue
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
			:username="user.username"
			:level="user.level"
			:experience="user.experience"
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
