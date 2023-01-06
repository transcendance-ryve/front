<script setup lang="ts">

	import { type Ref } from 'vue'
	import UserInfos from '../Utils/UserInfos.vue'
	import { logoSettings, logoTrash, logoMsg, logoAdd } from '../../assets/logoSVG'
	import Btn1 from '../Utils/Btn1.vue'
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
		<div class="ProfileTag-btnsWrap" v-if="type == 1">
			<button class="Btn-2FA"><span class="Btn-value">2FA</span></button>
			<Btn1
				:type=5
				:logo="logoSettings"
				value="Settings"
				width="136em"
				fontSize="16em"
			/>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type == 2">
			<Btn1
				:type=3
				:logo="logoTrash"
				value="Delete"
				width="121em"
				fontSize="16em"
			/>
			<Btn1
				:type=1
				:logo="logoMsg"
				value="Message"
				width="143em"
				fontSize="16em"
			/>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type == 3">
			<Btn1
				:type=1
				:logo="logoAdd"
				value="Add to friend"
				width="173em"
				fontSize="16em"
			/>
		</div>
	</div>

</template>
