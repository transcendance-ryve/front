<script setup lang="ts">

	import { withDefaults } from 'vue';

	interface Props {
		value: string | boolean
		selected?: boolean
		logo: string
		height?: string
	}

	const props = withDefaults(defineProps<Props>(), {
		selected: false,
		height: '48em'
	})
	
</script>

<template>

	<button
		class="Swicth-btn"
		:class="{ 'Switch-btn--selected': selected }"
		@click="$emit('click')"
	>
		<span
			class="Swicth-btn-logo"
			v-html="logo"
		>
		</span>
		<span class="Swicth-btn-value">{{ value }}</span>
	</button>

</template>

<style lang="scss" scoped>

	.Swicth-btn {
		height: v-bind(height);
	}

</style>