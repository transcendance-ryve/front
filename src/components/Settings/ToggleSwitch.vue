<script setup lang="ts">

	import	{ ref } from 'vue'

	const props = defineProps({
		active: {
			type: Boolean,
			default: false
		}
	})

</script>

<template>

	<div class="ToggleSwitch">
		<span
			class="Slider"
			:class="{'Slider--active': active}"
		>
		</span>
	</div>

</template>
