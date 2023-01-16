<template>
	<div
		class="message"
	>
		<span
			v-if="newUser"
			class="message__created_at"
		>
			{{ moment(message.createdAt).fromNow() }}
		</span>
		<div 
			class="message__content"
			:class="{ current: user?.id === message.sender.id, same_user: sameUser, other_user: !sameUser && !lastUser}"
		>
			<img v-if="user?.id !== message.sender.id && !sameUser" :src="message.sender.avatar" alt="">
			<p :class="{ current: user?.id === message.sender.id}">{{ message.content }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from '@/stores/UserStore';
	import { defineProps, ref } from 'vue'
	import moment from 'moment';

	const userStore = useUserStore();
	const user = ref(userStore.me);

	interface Props {
		message: any;
		sameUser: boolean;
		newUser: boolean;
		lastUser: boolean;
	}
	const props: Props = defineProps<Props>();
</script>