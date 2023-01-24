<script setup lang="ts">

	import { ref, type Ref, onMounted, onUnmounted } from 'vue'
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
	const	cursor: string = props.notif.handleClick ? 'pointer' : 'default'
	let		timer: number | undefined = undefined

	const	closeNotif = () => {
		if (timer)
			clearTimeout(timer)
		notifClose.value = true
		setTimeout(() => notifStore.removeNotif(props.notif.id), 500)
	}

	onMounted(() => timer = setTimeout(() => closeNotif(), 5000))

	onUnmounted(() => clearTimeout(timer))

</script>

<template>

	<div
		:class="[classNames, {'NotifTag--close': notifClose }]"
		@click="notif.handleClick"
	>
		<span class="NotifTag-closeBtn" v-html="logoCloseNotif" @click.stop="closeNotif()"></span>
		<div class="NotifTag-content">
			<img v-if="notif.avatar" class="Content-avatar" :src="notif.avatar" alt="">
			<div class="Content-text">
				<span v-if="notif.label" class="Text-label">{{ notif.label }}</span>
				<span v-if="notif.text" class="Text-value">{{ notif.text }}</span>
			</div>
		</div>
	</div>

</template>

<style lang="scss" scoped>

	.NotifTag {
		cursor: v-bind(cursor);
	}

</style>
