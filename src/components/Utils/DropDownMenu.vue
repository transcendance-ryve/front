<script setup lang="ts">

	import { computed, withDefaults } from 'vue'

	interface Props {
		label?: string
		options: string[]
		selectValue?: string
		width?: string
		height?: string
		logo?: string
	}

	const	props = withDefaults(defineProps<Props>(), {
		label: '',
		selectValue: '',
		width: '50rem',
		height: '30rem',
		logo: ''
	})

	const	emit = defineEmits(['select'])

	const	optionsToSelect = computed(() => {
		return props.options.filter(val => val !== props.selectValue)
	})

	const	selectVal = (value: any) => {
		emit('select', value as string)
	}

</script>

<template>

	<ul class="DropDownMenu">
		<li class="Menu">
			<span class="Menu-section">
				<span class="Menu-logo" v-html="logo"></span>
				<span class="Menu-text">{{ label }}</span>
				<span class="Menu-valSelected">{{ selectValue }}</span>
			</span>
			<ul class="Menu-options">
				<li
					v-for="(option, index) in optionsToSelect"
					:key="index"
				>
					<span class="Menu-section" @click="selectVal(option)">
						<span class="Menu-text">{{ option }}</span>
					</span>
				</li>
			</ul>
		</li>
	</ul>

</template>

<style lang="scss" scoped>

	.DropDownMenu {
		width: v-bind(width);
		height: v-bind(height);

		.Menu-options {
			width: v-bind(width);
			margin-top: v-bind(height);
		}
	}

</style>