<!-- <script setup lang="ts">

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
</template> -->


<script setup lang="ts">

	import { ref, type Ref, toRefs, type ToRefs, watch, nextTick } from 'vue';
	import Message from './Message.vue';

	export interface Props {
		messages: any[]
		getFollowing: Function
	}

	const props = defineProps<Props>()
	const messagesContainer: Ref<HTMLElement> = ref(null!);
	const { messages }: ToRefs<Readonly<Props>> = toRefs(props);
		let scrollPosition = 0;

	const	timedMessage = (index: number): boolean => {
		if (index === 0)
			return true;
		const	currentMessage = props.messages[index],
				prevMessage = props.messages[index - 1];
		const	currentTime = new Date(currentMessage.createdAt).getUTCMinutes(),
				prevTime = new Date(prevMessage.createdAt).getUTCMinutes();
		if (currentTime - prevTime > 3)
			return true;
		return false;
	}

	const handleScroll = (e: any) => {
		if (e.target.scrollTop === 0) {
			scrollPosition = e.target.scrollHeight - e.target.scrollTop;
			props.getFollowing();
		}
	}

	watch(messages, async () => {
		await nextTick();
		messagesContainer.value!.scrollTop = messagesContainer.value!.scrollHeight - scrollPosition;
		scrollPosition = 0;
	}, { deep: true })

</script>

<template>
	<div class="ConvContent" ref="messagesContainer" @scroll="handleScroll">
		<Message
			v-for="(msg, index) in messages"
			:key="index"
			:message="msg"
			:sameUser="messages[index + 1]?.sender.id === msg.sender.id"
			:newUser="timedMessage(index)"
			:lastUser="index === messages.length - 1"
			ref="messagesRefs"
		/>
	</div>
</template>
