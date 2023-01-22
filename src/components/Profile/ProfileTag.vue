<script setup lang="ts">

	import { withDefaults } from 'vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import { logoSettings, logoTrash, logoMsg, logoAdd, logoAccept, logoRefuse, logoBlockMsg } from '../../assets/logoSVG'
	import { useUserStore } from '@/stores/UserStore'
	import Btn from '../Utils/Btn.vue'
	import router from '@/router'
	import type { User } from '@/types/User'

	interface Props {
		type?: number
		user: User
		blockRelation: number
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
		<div class="ProfileTag-btnsWrap" v-if="blockRelation !== -1">
			<Btn
				v-if="type !== 1"
				:type="blockRelation === 1 ? 8 : 7"
				:logo="logoBlockMsg"
				:value="blockRelation === 1 ? 'Unblock' : 'Block'"
				:width="blockRelation === 1 ? '140em' : '121em'"
				fontSize="16em"
				@click="blockRelation === 1 ? $emit('unblock') : $emit('block')"
			/>
			<div v-if="type === 1" class="ProfileTag-status" :class="{ 'Status--active': useUserStore().me.tfa_enabled }">
				<span class="Status-value">2FA</span>
			</div>
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
