<script setup lang="ts">

	import UserInfos from '../Utils/UserInfos.vue'
	import { logoSettings, logoTrash, logoMsg, logoAdd } from '../../assets/logoSVG'

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
			:userName="user.userName"
			:level="user.level"
			:levelPerCent="user.levelProgression"
			:sizeXL="true"
		/>
		<div class="ProfileTag-btnsWrap" v-if="type == 1">
			<button class="Btn-2FA"><span class="Btn-value">2FA</span></button>
			<button class="Btn-settings">
				<span class="Btn-logo" v-html="logoSettings"></span>
				<span class="Btn-value">Settings</span>
			</button>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type == 2">
			<button class="Btn-type1">
				<span class="Btn-logo" v-html="logoTrash"></span>
				<span class="Btn-value">Delete</span>
			</button>
			<button class="Btn-type2">
				<span class="Btn-logo" v-html="logoMsg"></span>
				<span class="Btn-value">Message</span>
			</button>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type == 3">
			<button class="Btn-type2">
				<span class="Btn-logo" v-html="logoAdd"></span>
				<span class="Btn-value">Add to friend</span>
			</button>
		</div>
	</div>

</template>
