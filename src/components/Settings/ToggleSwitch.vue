<script setup lang="ts">

	import { withDefaults } from 'vue';

	interface Props {
		active: boolean
	}

	withDefaults(defineProps<Props>(), {
		active: false
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
