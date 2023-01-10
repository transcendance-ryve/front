<script setup lang="ts">

	import { withDefaults } from 'vue'
	import { logoCloseNotif } from '@/assets/logoSVG'

	export interface Props {
		label?: string
		text?: string
		avatar?: string
	}

	const props = withDefaults(defineProps<Props>(), {
		label: '',
		text: '',
		avatar: '',
	})

</script>

<template>

	<div class="NotifTag">
		<span class="NotifTag-closeBtn" v-html="logoCloseNotif"></span>
		<div class="NotifTag-content">
			<img class="Content-avatar" :src="avatar" alt="">
			<div class="Content-text">
				<span class="Content-label">{{ label }}</span>
				<span class="Content-text">{{ text }}</span>
			</div>
		</div>
	</div>

</template>
