<template>
	<div
		class="message"
	>
		<div
			v-if="newUser"
			class="message__created_at"
		>
			<span class="created_at_value">{{ moment(message.createdAt).fromNow() }}</span>
		</div>
		<div 
			class="message__content"
			:class="{ current: user?.id === message.sender.id, same_user: sameUser, other_user: !sameUser && !lastUser}"
		>
			<img v-if="user?.id !== message.sender.id && !sameUser" :src="message.sender.avatar" alt="">
			<span v-if="user?.id !== message.sender.id && !sameUser" class="ToolTip-container" @click="profileRedirect(message.sender.id)">
				<Tooltip :value="message.sender.username" backgroundColor="#2e3042" :shiftL="true"/>
			</span>
			<span class="message__value__wrapper" :class="{ current: user?.id === message.sender.id}">
				<p class="message__value">{{ message.content }}</p>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { useUserStore } from '@/stores/UserStore';
	import { ref } from 'vue';
	import moment from 'moment';
	import Tooltip from '../Utils/Tooltip.vue';
	import { profileRedirect } from '@/router';

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