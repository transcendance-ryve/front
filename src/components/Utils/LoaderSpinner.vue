<script setup lang="ts">

	import { withDefaults } from 'vue';

	interface Props {
		size?: string
	}

	const props = withDefaults(defineProps<Props>(), {
		size: '80em',
	})

	const	sizeValue = props.size.slice(0, props.size.search(/^[a-z]+$/i) - 1)

</script>

<template>

	<div class="Loader-spinner">
		<div></div><div></div><div></div><div></div><div></div><div></div>
		<div></div><div></div><div></div><div></div><div></div><div></div>
	</div>

</template>

<style lang="scss" scoped>

	.Loader-spinner {
		width: v-bind(size);
		height: v-bind(size);

		div {
			transform-origin: calc(v-bind(size) / 2) calc(v-bind(size) / 2);
		}
	}

	.Loader-spinner div:after {
		height: calc(v-bind(size) / 4.5);
	}

</style>