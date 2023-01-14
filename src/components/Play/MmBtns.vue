<script setup lang="ts">
	import Btn from '../Utils/Btn.vue';

	defineProps({
		start: {
			type: Boolean,
			default: false
		},
		gameFound: {
			type: Boolean,
			default: false
		}
	})
</script>

<template>
	<div class="Modal-BtnWrapper" :class="{'BtnWrapper--row': gameFound}">
		<Btn
			v-if="!start"
			class="Btn-blue"
			:type=1
			value="Start game"
			width="177em"
			height="56em"
			fontSize="20em"
			@click="$emit('start')"
		/>

		<Btn
			v-if="start && !gameFound"
			class="Btn-red"
			:type=6
			value="Cancel"
			width="136em"
			height="56em"
			fontSize="20em"
			@click="$emit('cancel')"
		/>
		<span v-if="!start && !gameFound" class="Queue-value">13</span>

		<Btn
			v-if="gameFound"
			class="Btn-blue"
			:type=1
			value="Yes"
			width="100em"
			height="56em"
			fontSize="20em"
			@click="$emit('accept')"
		/>
		<Btn
			v-if="gameFound"
			class="Btn-red"
			:type=6
			value="No"
			width="92em"
			height="56em"
			fontSize="20em"
			@click="$emit('refuse')"
		/>
	</div>

</template>
