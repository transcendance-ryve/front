<script setup lang="ts">

	import { ref, toRefs } from 'vue'
	import UserTag from './UserTag.vue'
	import { logoListArrow } from '../../assets/logoSVG'

	const props = defineProps({
		label: {
			type: String,
			default: ''
		},
		list: {
			type: Object,
		},
		admin: {
			type: Boolean,
			default: false
		}
	})

	const	open = ref(false)
	const	closed = ref(false)

	const	p = toRefs(props)

	const	userTagType = () => {
		if (p.label.value == 'Banned') {
			return p.admin.value ? 'BannedA' : 'Banned'
		}
		else if (p.label.value == 'Pending')
			return 'Pending'
		else {
			return p.admin.value ? 'ChanUserA' : 'ChanUser'
		}
	}

	const	updateState = () => {
		open.value = !open.value
		closed.value = !open.value
	}

</script>

<template>

	<div class="DropDownListWrap" :class="{'DropDownListWrap--open': open, 'DropDownListWrap--closed': closed}">
		<label
			class="DropDownLabel"
			
			@click="updateState"
		>
			{{ label }}
			<span class="DropDownLabel-arrow" v-html="logoListArrow"></span>
		</label>
		<div class="DropDownList" v-if="open">
			<UserTag
				class="DropDownList-Tag"
				v-for="(user, index) in list"
				:key="index"
				:section="userTagType()"
				:userName="user.name"
			/>
		</div>
	</div>

</template>
