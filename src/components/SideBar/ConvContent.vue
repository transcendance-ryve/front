<script setup lang="ts">

	import { ref, onMounted, watch } from 'vue';
	import Message from './Message.vue';

	export interface Props {
		messages: any[]
	}

	const props = defineProps<Props>()

	// scroll to bottom when new message
	const messagesRefs = ref(null);

	watch(messagesRefs, (newMessagesRefs: any) => {
		if (newMessagesRefs) {
			const el = newMessagesRefs[props.messages.length - 1].$el;
			if (el) el.scrollIntoView();
		}
	});

</script>

<template>
	<div class="message__list" ref="messagesContainer">
		<Message
			v-for="(msg, index) in messages"
			:key="index"
			:message="msg"
			:sameUser="messages[index + 1]?.sender.id === msg.sender.id"
			:newUser="messages[index - 1]?.sender.id !== msg.sender.id || index === 0 || !messages[index - 1]"
			:lastUser="index === messages.length - 1"
			ref="messagesRefs"
		/>
	</div>
</template>
