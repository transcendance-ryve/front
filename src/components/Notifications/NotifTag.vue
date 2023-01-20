<script setup lang="ts">

	import { ref, type Ref } from 'vue'
	import { logoCloseNotif } from '@/assets/logoSVG'
	import { useNotifStore } from '@/stores/NotificationsStore'
	import type { notification } from '@/stores/NotificationsStore'

	export interface Props {
		notif: notification
	}

	const	props = defineProps<Props>()

	const	notifStore = useNotifStore()
	const	notifClose: Ref<boolean> = ref(false)
	const	classNames: string = 'NotifTag NotifTag--' + props.notif.type
	let		timer: number | undefined = undefined

	const	closeNotif = () => {
		if (timer)
			clearTimeout(timer)
		notifClose.value = true
		setTimeout(() => notifStore.removeNotif(props.notif.id), 500)
	}

	timer = setTimeout(() => closeNotif(), 3000)

</script>

<template>

	<div
		:class="[classNames, {'NotifTag--close': notifClose }]"
		@click="notif.handleClick"
	>
		<span class="NotifTag-closeBtn" v-html="logoCloseNotif" @click="closeNotif()"></span>
		<div class="NotifTag-content">
			<img v-if="notif.avatar" class="Content-avatar" :src="notif.avatar" alt="">
			<div class="Content-text">
				<span v-if="notif.label" class="Text-label">{{ notif.label }}</span>
				<span v-if="notif.text" class="Text-value">{{ notif.text }}</span>
			</div>
		</div>
	</div>

</template>
