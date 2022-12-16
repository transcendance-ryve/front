<script setup lang="ts">

	const props = defineProps({
		value: {
			type: String,
			default: '',
		},
		selected: {
			type: Boolean,
			default: false,
		},
		logo: {
			type: String,
		},
		height: {
			type: String,
			default: '48em'
		}
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