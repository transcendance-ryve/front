<script setup lang="ts">

	import UserInfos from '../Utils/UserInfos.vue'
	import { logoSettings, logoTrash, logoMsg } from '../../assets/logoSVG'

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
			:levelPerCent="user.levelPerCent"
			:sizeXL="true"
		/>
		<div class="ProfileTag-btnsWrap" v-if="type == 1">
			<button class="Btn-2FA">2FA</button>
			<button class="Btn-settings">
				<span class="Btn-logo" v-html="logoSettings"></span>
				Settings
			</button>
		</div>
		<div class="ProfileTag-btnsWrap" v-if="type == 2">
			<button class="Btn-type1">
				<span class="Btn-logo" v-html="logoTrash"></span>
				Delete
			</button>
			<button class="Btn-type2">
				<span class="Btn-logo" v-html="logoMsg"></span>
				Message
			</button>
		</div>
	</div>

</template>
