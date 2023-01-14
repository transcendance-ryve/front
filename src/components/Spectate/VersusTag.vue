<script setup lang="ts">

	import { ref, type Ref, watch, toRefs } from 'vue'
	import { withDefaults } from 'vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import { logoScore, logoScoreBlue, logoScoreRed } from '../../assets/logoSVG'
	import type { Player, User } from '@/types/User'

	interface Props {
		player: Partial<Player>
		reverse?: boolean
	}

	const	props = withDefaults(defineProps<Props>(), {
		reverse: false
	})

	const	userColor: string = props.reverse ? '#FF4646' : '#0177FB'

	const	p = toRefs(props)
	const	logo = (index: number) => {
		if (index <= p.player.value.score!)
			return props.reverse ? logoScoreRed : logoScoreBlue
		else
			return logoScore
	}

	const	user: Ref<Partial<User>> = ref({
		id: props.player.id,
		avatar: props.player.avatar,
		username: props.player.username,
		level: props.player.level,
		experience: props.player.experience,
		next_level: props.player.next_level
	})

	watch(p.player, (playerUpdated) => {
		user.value = {
			id: playerUpdated.id,
			avatar: playerUpdated.avatar,
			username: playerUpdated.username,
			level: playerUpdated.level,
			experience: playerUpdated.experience,
			next_level: playerUpdated.next_level
		}
	}, { deep: true })

</script>

<template>

	<div
		class="VersusTag"
		:class="{'VersusTag--reverse': reverse}"
	>
		<UserInfos
			:user="user"
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
