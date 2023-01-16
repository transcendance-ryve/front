<script setup lang="ts">

	import Message from './Message.vue';

	export interface Props {
		messages: any[]
	}

	defineProps<Props>()
</script>

<template>
	<div class="message__list">
		<Message
			v-for="(msg, index) in messages"
			:key="index"
			:message="msg"
			:sameUser="messages[index + 1]?.sender.id === msg.sender.id"
			:newUser="messages[index - 1]?.sender.id !== msg.sender.id || index === 0 || !messages[index - 1]"
			:lastUser="index === messages.length - 1"
		/>
	</div>
</template>
