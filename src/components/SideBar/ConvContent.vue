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
		const	currentTime: number = new Date(currentMessage.createdAt).getTime(),
				prevTime: number = new Date(prevMessage.createdAt).getTime();
		if (currentTime - prevTime >= 30000)
			return true;
		return false;
	}

	const handleScroll = async (e: any) => {
		if (e.target.scrollTop === 0) {
			scrollPosition = e.target.scrollHeight - e.target.scrollTop;
			if (!await props.getFollowing())
				scrollPosition = 0
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
