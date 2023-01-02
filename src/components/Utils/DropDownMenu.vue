<!-- <script setup lang="ts">

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
		defaultValue: {
			type: [String, Boolean],
			default: false
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

	const	valSelected = p.defaultValue.value ?  ref(p.defaultValue.value) : ref(p.options.value[0])

	const	optionsToSelect = computed(() => {
		return p.options.value.filter(val => val != valSelected.value)
	})

	const	selectVal = (index: number) => {
		valSelected.value = optionsToSelect.value[index]
		emit('select', valSelected.value)
	}

</script>

<template>

	<ul class="DropDownMenu">
		<li class="Menu">
			<span class="Menu-section">
				<span class="Menu-logo" v-html="logo"></span>
				<span class="Menu-text">{{ value }}</span>
				<span class="Menu-valSelected">{{ valSelected }}</span>
			</span>
			<ul class="Menu-options">
				<li
					v-for="(option, index) in optionsToSelect"
					:key="index"
				>
					<span class="Menu-section" @click="selectVal(index)">
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

</style> -->

<script setup lang="ts">

	import { toRefs, computed } from 'vue'

	const props = defineProps({
		label: {
			type: String,
			default: '',
		},
		options: {
			type: Array,
			default: [''],
		},
		selectValue: {
			type: [String, Boolean],
			default: false
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

	const	optionsToSelect = computed(() => {
		return p.options.value.filter(val => val != p.selectValue.value)
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