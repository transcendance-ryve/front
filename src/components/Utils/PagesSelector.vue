<script setup lang="ts">

	import { toRefs, computed } from 'vue'
	import BaseInput from './BaseInput.vue'
	import LeaderboardTag from '../Leaderboard/LeaderboardTag.vue'

	const props = defineProps<{
		page: number,
		pagesSize: number,
	}>();

	const p = toRefs(props);

	const	pagesBtn = computed(() => {
		if (p.pagesSize.value == 2)
			return [1, 2]
		else if ((p.pagesSize.value > 1 && p.pagesSize.value < 4) ||
				p.pagesSize.value > 3 && p.page.value == 1)
			return [1, 2, 3]
		else if (p.pagesSize.value > 3 && p.page.value == p.pagesSize.value)
			return [p.pagesSize.value - 2, p.pagesSize.value - 1, p.pagesSize.value]
		else
			return [p.page.value -1, p.page.value, p.page.value + 1]
	})


</script>

<template>

	<div class="PagesSelector" v-if="pagesSize > 1">
		<button v-if="page > 2 && pagesSize > 3" @click="$emit('update', 1)">&lt&lt</button>
		<button
			v-for="n in pagesBtn"
			:key=n
			class="PagesSelector-Btn"
			:class="{'Pages--selected': page == n}"
			@click="$emit('update', n)"
		>
			<span class="Btn-value">{{ n }}</span>
		</button>
		<button v-if="page < pagesSize -1 && pagesSize > 3" @click="$emit('update', pagesSize)">>></button>
	</div>

</template>
