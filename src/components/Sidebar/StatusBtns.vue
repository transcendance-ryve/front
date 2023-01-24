<script setup lang="ts">

	export interface Props {
		status: string
	}

	defineProps<Props>()

</script>

<template>

	<div class="StatusBtns">
		<button
			class="StatusBtn"
			:class="{
				'StatusBtn-public': status !== 'PUBLIC',
				'StatusBtn-public--selected': status === 'PUBLIC'
			}"
			@click="$emit('statusChanged', 'PUBLIC')"
		>
			<span class="StatusBtn-value">Public</span>
		</button>
		<button
			class="StatusBtn"
			:class="{
				'StatusBtn-protected': status !== 'PROTECTED',
				'StatusBtn-protected--selected': status === 'PROTECTED'
			}"
			@click="$emit('statusChanged', 'PROTECTED')"
		>
			<span class="StatusBtn-value">Protected</span>
		</button>
		<button
			class="StatusBtn"
			:class="{
				'StatusBtn-private': status !== 'PRIVATE',
				'StatusBtn-private--selected': status === 'PRIVATE'
			}"
			@click="$emit('statusChanged', 'PRIVATE')"
		>
			<span class="StatusBtn-value">Private</span>
		</button>
	</div>

</template>