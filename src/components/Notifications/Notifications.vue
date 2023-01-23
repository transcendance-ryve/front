<script setup lang="ts">

	import NotifTag from './NotifTag.vue'
	import { useNotifStore } from '@/stores/NotificationsStore'

	const	notifStore = useNotifStore()

</script>

<template>

	<div class="Notifications" v-if="notifStore.notifs.length">
		<NotifTag
			v-for="notif in notifStore.notifs"
			:key="notif.id"
			:notif="notif"
		/>
	</div>

</template>