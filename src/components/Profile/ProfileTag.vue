<script setup lang="ts">

	import { type Ref } from 'vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import { logoSettings, logoTrash, logoMsg, logoAdd, logoAccept, logoRefuse } from '../../assets/logoSVG'
	import Btn1 from '../Utils/Btn1.vue'
	import { useUserStore } from '@/stores/UserStore'
	import router from '@/router'

	const props = defineProps({
		type: {
			type: Number,
			default: 1
		},
		user: {
			type: Object
		}
	})

	const	userStore = useUserStore()

</script>

<template>

	<div class="ProfileTag">
		<UserInfos
			:avatar="user?.avatar"
			:username="user?.username"
			:level="user?.level"
			:experience="user?.experience"
			:nextLevel="user?.next_level"
			:sizeXL="true"
		/>
		<div class="ProfileTag-btnsWrap" v-if="type === 1">
			<div class="ProfileTag-status" :class="{ 'Status--active': userStore.me.tfa_enabled }">
				<span class="Status-value">2FA</span>
			</div>
			<Btn1
				:type=5
				:logo="logoSettings"
				value="Settings"
				width="136em"
				fontSize="16em"
				@click="router.push({ path: '/settings' })"
			/>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type === 2">
			<Btn1
				:type=3
				:logo="logoTrash"
				value="Delete"
				width="121em"
				fontSize="16em"
				@click="$emit('delete')"
			/>
			<Btn1
				:type=1
				:logo="logoMsg"
				value="Message"
				width="143em"
				fontSize="16em"
				@click="$emit('message')"
			/>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type === 3">
			<Btn1
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
			<Btn1
				:type=1
				:logo="logoAccept"
				value="Accept"
				width="174em"
				fontSize="16em"
				@click="$emit('accept')"
			/>
			<Btn1
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
