<script setup lang="ts">

	import { withDefaults } from 'vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import { logoSettings, logoTrash, logoMsg, logoAdd, logoAccept, logoRefuse } from '../../assets/logoSVG'
	import Btn from '../Utils/Btn.vue'
	import { useUserStore } from '@/stores/UserStore'
	import router from '@/router'
	import type { User } from '@/types/User'

	interface Props {
		type: number
		user: User
	}

	withDefaults(defineProps<Props>(), {
		type: 1,
	})

	const	userStore = useUserStore()

</script>

<template>

	<div class="ProfileTag">
		<UserInfos
			:user="user"
			:sizeXL="true"
		/>
		<div class="ProfileTag-btnsWrap" v-if="type === 1">
			<div class="ProfileTag-status" :class="{ 'Status--active': userStore.me.tfa_enabled }">
				<span class="Status-value">2FA</span>
			</div>
			<Btn
				:type=5
				:logo="logoSettings"
				value="Settings"
				width="136em"
				fontSize="16em"
				@click="router.push({ path: '/settings' })"
			/>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type === 2">
			<Btn
				:type=3
				:logo="logoTrash"
				value="Delete"
				width="121em"
				fontSize="16em"
				@click="$emit('delete')"
			/>
			<Btn
				:type=1
				:logo="logoMsg"
				value="Message"
				width="143em"
				fontSize="16em"
				@click="$emit('message')"
			/>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type === 3">
			<Btn
				:type=1
				:logo="logoAdd"
				value="Add to friend"
				width="173em"
				fontSize="16em"
				@click="$emit('add')"
			/>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type === 4">
			<div class="ProfileTag-status">
				<span class="Status-value">Invitation sent</span>
			</div>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type === 5">
			<Btn
				:type=1
				:logo="logoAccept"
				value="Accept"
				width="174em"
				fontSize="16em"
				@click="$emit('accept')"
			/>
			<Btn
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
