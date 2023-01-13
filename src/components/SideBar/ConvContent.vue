<script setup lang="ts">

	export interface Props {
		messages: any[]
	}

	defineProps<Props>()

</script>

<template>

	<div class="Conv-content">
		<div class="Content-msg" v-for="(msg, index) in messages" :key="index">
		<!-- <div class="Content-msg"> -->
			<span class="Msg-value">{{ msg.content }}</span>
			<!-- <span class="Msg-value">{{ target }}</span> -->
		</div>
	</div>

</template>
