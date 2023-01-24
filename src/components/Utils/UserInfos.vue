<script setup lang="ts">

	import { toRefs, computed, withDefaults } from 'vue'
	import type { User } from '@/types/User'

	export interface Props {
		user: Partial<User>
		mainColor?: string
		xpBackground?: string
		avatarBorder?: boolean
		reverse?: boolean
		sizeXS?: boolean
		sizeXL?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		mainColor: '#0177FB',
		xpBackground: '#1F1E2C',
		avatarBorder: false,
		reverse: false,
		sizeXS: false,
		sizeXL: false
	})

	const	percentXP = computed(() => {
		let	percent: number = (props.user.experience || 0) * 100 / (props.user.next_level || 0)
		percent = Number.isInteger(percent) ? percent : parseFloat(percent.toFixed(2))
		return percent.toString() + '%'
	})

	const	borderAvatar: string = props.avatarBorder ?
		'4em solid' + props.mainColor : 'none'
	const	avatarWidth: string = props.avatarBorder ? '72em' : '64em'

</script>

<template>

	<div
		class="UserInfos"
		:class="{
			'UserInfos--reverse': reverse,
			'UserInfos--XS': sizeXS,
			'UserInfos--XL': sizeXL
		}"
	>
		<img
			class="UserInfos-avatar"
			:src="user.avatar"
			alt="avatar"
		>
		<div class="UserInfos-content">
			<span class="Content-name">{{ user.username }}</span>
			<div class="Content-level" v-if="user.level !== undefined">
				<span class="Level-percentWrap">
					<span class="Level-percent"></span>
				</span>
				<span class="Level">LVL {{ user.level }} - {{ percentXP }}</span>
			</div>
		</div>
		<slot></slot>
	</div>

</template>

<style lang="scss">

	.UserInfos-avatar {
		width: v-bind(avatarWidth);
		border: v-bind(borderAvatar);
	}

	.Level-percentWrap {
		background: v-bind(xpBackground);

		.Level-percent {
			width: v-bind(percentXP);
			background: v-bind(mainColor);
		}
	}

</style>