<script setup lang="ts">

	import { withDefaults } from 'vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import { logoSettings, logoTrash, logoMsg, logoAdd, logoAccept, logoRefuse, logoBlockMsg } from '../../assets/logoSVG'
	import Btn from '../Utils/Btn.vue'
	import router from '@/router'
	import type { User } from '@/types/User'

	interface Props {
		type?: number
		user: User
		isBlocked: boolean
	}

	const	props = withDefaults(defineProps<Props>(), {
		type: 1,
	})

</script>

<template>

	<div class="ProfileTag">
		<UserInfos
			:user="user"
			:sizeXL="true"
		/>
		<div class="ProfileTag-btnsWrap">
			<Btn
				v-if="type !== 1"
				:type="isBlocked ? 8 : 7"
				:logo="logoBlockMsg"
				:value="isBlocked ? 'Unblock' : 'Block'"
				:width="isBlocked ? '140em' : '121em'"
				fontSize="16em"
				@click="isBlocked ? $emit('unblock') : $emit('block')"
			/>
			<Btn
				v-if="type === 1"
				:type=5
				:logo="logoSettings"
				value="Settings"
				width="136em"
				fontSize="16em"
				@click="router.push({ path: '/settings' })"
			/>
			<Btn
				v-if="type === 2"
				:type=3
				:logo="logoTrash"
				value="Delete"
				width="121em"
				fontSize="16em"
				@click="$emit('delete')"
			/>
			<Btn
				v-if="type === 2"
				:type=1
				:logo="logoMsg"
				value="Message"
				width="143em"
				fontSize="16em"
				@click="$emit('message')"
			/>
			<Btn
				v-if="type === 3"
				:type=1
				:logo="logoAdd"
				value="Add to friend"
				width="173em"
				fontSize="16em"
				@click="$emit('add')"
			/>
			<div class="ProfileTag-status" v-if="type === 4">
				<span class="Status-value">Invitation sent</span>
			</div>
			<Btn
				v-if="type === 5"
				:type=1
				:logo="logoAccept"
				value="Accept"
				width="174em"
				fontSize="16em"
				@click="$emit('accept')"
			/>
			<Btn
				v-if="type === 5"
				:type=3
				:logo="logoRefuse"
				:fillLogo="false"
				value="Refuse"
				width="174em"
				fontSize="16em"
				@click="$emit('refuse')"
			/>
		</div>
	</div>

</template>
