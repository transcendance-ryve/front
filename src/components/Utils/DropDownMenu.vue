<script setup lang="ts">

	import { toRefs, ref, computed } from 'vue'

	const props = defineProps({
		value: {
			type: String,
			default: '',
		},
		options: {
			type: Array,
			default: [''],
		},
		width: {
			type: String,
			default: '50rem',
		},
		height: {
			type: String,
			default: '30rem',
		},
		logo: {
			type: String
		}
	})

	const	emit = defineEmits(['select'])

	const	p = toRefs(props)

	const	valSelected = ref(p.options.value[0])

	const	optionsToSelect = computed(() => {
		return p.options.value.filter(val => val != valSelected.value)
	})

	// const	val = computed(() => {
	// 	return p.value.value + ': ' + valSelected.value
	// })

	const	selectVal = (index: number) => {
		valSelected.value = optionsToSelect.value[index]
		emit('select', valSelected.value)
	}

</script>

<template>

	<ul class="DropDownMenu">
		<li class="Menu">
			<a href="#"><span class="Menu-logo" v-html="logo"></span>{{ value }}<span class="Menu-valSelected">{{ valSelected }}</span> </a>
			<ul class="Menu-options">
				<li
					v-for="(option, index) in optionsToSelect"
					:key="index"
				>
					<a href="#" @click="selectVal(index)">{{ option }}</a>
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