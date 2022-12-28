<script setup lang="ts">

	import { toRefs, computed, withDefaults } from 'vue'

	export interface Props {
		avatar?: string
		username?: string
		level?: number
		experience?: number
		nextLevel?: number
		mainColor?: string
		xpBackground?: string
		avatarBorder?: boolean
		reverse?: boolean
		sizeXS?: boolean
		sizeXL?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		avatar: '',
		username: '',
		level: 0,
		experience: 0,
		nextLevel: 0,
		mainColor: '#0177FB',
		xpBackground: '#1F1E2C',
		avatarBorder: false,
		reverse: false,
		sizeXS: false,
		sizeXL: false
	})

	const	p = toRefs(props)

	const	percentXP = computed(() => {
		let	percent: number = p.experience.value * 100 / p.nextLevel.value
		percent = Number.isInteger(percent) ? percent : parseFloat(percent.toFixed(2))
		return percent.toString() + '%'
	})
	const	borderAvatar = p.avatarBorder.value ?
		'4em solid' + p.mainColor.value : 'none'
	const		avatarWidth = p.avatarBorder.value ? '72em' : '64em'

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
			:src="avatar"
			alt="avatar"
		>
		<div class="UserInfos-content">
			<span class="Content-name">{{ username }}</span>
			<div class="Content-level">
				<span class="Level-percentWrap">
					<span class="Level-percent"></span>
				</span>
				<span class="Level">LVL {{ level }} - {{ percentXP }}</span>
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