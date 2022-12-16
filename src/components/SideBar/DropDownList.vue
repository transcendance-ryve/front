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
		owner: {
			type: Boolean,
			default: false,
		},
		admin: {
			type: Boolean,
			default: false
		},
		open: {
			type: Boolean,
			default: false
		}
	})

	const	p = toRefs(props)

	const	open = ref(p.open.value)
	const	closed = ref(false)

	const	userTagType = () => {
		if (p.label.value == 'Banned' && (p.admin.value || p.owner.value))
			return 'delete'
		else if (p.label.value == 'Administrators' && p.owner.value)
			return 'allPrivilegesA'
		else if (p.label.value == 'Users' && (p.admin.value || p.owner.value))
			return 'allPrivileges'
		else
			return 'onlySee'
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
