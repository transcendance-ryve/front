<script setup lang="ts">

	import { computed } from 'vue'
	import BaseInput from './BaseInput.vue'
	import LeaderboardTag from '../Leaderboard/LeaderboardTag.vue'
	import { logoFirstPage, logoLastPage } from '../../assets/logoSVG'

	const props = defineProps<{
		page: number,
		pagesSize: number,
	}>();

	const	pagesBtn = computed(() => {
		if (props.pagesSize === 2)
			return [1, 2]
		else if ((props.pagesSize > 1 && props.pagesSize < 4) ||
			props.pagesSize > 3 && props.page === 1)
			return [1, 2, 3]
		else if (props.pagesSize > 3 && props.page === props.pagesSize)
			return [props.pagesSize - 2, props.pagesSize - 1, props.pagesSize]
		else
			return [props.page -1, props.page, props.page + 1]
	})


</script>

<template>

	<div class="PagesSelector" v-if="pagesSize > 1">
		<button
			v-if="page > 2 && pagesSize > 3"
			class="PagesSelector-Btn"
			@click="$emit('update', 1)"
		>
			<span class="Btn-logo" v-html="logoFirstPage"></span>
		</button>
		<button
			v-for="n in pagesBtn"
			:key=n
			class="PagesSelector-Btn"
			:class="{'Pages--selected': page === n}"
			@click="$emit('update', n)"
		>
			<span class="Btn-value">{{ n }}</span>
		</button>
		<button
			v-if="page < pagesSize -1 && pagesSize > 3"
			class="PagesSelector-Btn"
			@click="$emit('update', pagesSize)"
		>
			<span class="Btn-logo" v-html="logoLastPage"></span>
		</button>
	</div>

</template>
