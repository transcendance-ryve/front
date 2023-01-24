import { ref, type Ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import type { notifKey } from '@/types/Sidebar'

export const useSidebarStore = defineStore('sbStore', () => {

	const	state = reactive({
		section: 1,
		friendsState: 1,
		channelsState: 1,
		notifsState: 1
	})

	const	notifications = reactive({
		game: 0,
		friend: 0,
		channel: 0
	})

	const	increaseNotif = (key: notifKey) => {
		let	currentNotifStateKey
		if (state.notifsState === 1)
			currentNotifStateKey = 'game'
		else if (state.notifsState === 2)
			currentNotifStateKey = 'friend'
		else if (state.notifsState === 3)
			currentNotifStateKey = 'channel'
		if (state.section !== 3 || (state.section === 3 && key !== currentNotifStateKey))
			notifications[key]++
	}

	const	decreaseNotif = (key: notifKey) => {
		if (notifications[key] > 0)
			notifications[key]--
	}

	const	notifActive = computed(() => {
		return (state.section !== 3
			&& (notifications.game || notifications.friend || notifications.channel))
	})

	const	newChan: Ref<boolean> = ref(false)

	const	spectate = reactive({ gameId: '' })

	const	conv = reactive({
		open: false,
		type: '',
		id: '',
		focus: true
	})

	function	updateSection(newVal: number) {
		if (newChan.value)
			newChan.value = false
		else if (conv.open)
			conv.open = false
		state.section = newVal
	}

	function	openConv(type: string, id: string = '', focus: boolean = true) {
		if (conv.open && id !== conv.id) {
			conv.open = false
			setTimeout(() => {
				conv.open = true
				conv.type = type
				conv.id = id
				conv.focus = focus
			}, 0)
		}
		else {
			conv.open = true
			conv.type = type
			conv.id = id
			conv.focus = focus
		}
	}

	function	resetState() {
		state.section = 1
		state.friendsState = 1
		state.channelsState = 1
		state.notifsState = 1
		conv.open = false
		newChan.value = false
		notifications.game = 0
		notifications.friend = 0
		notifications.channel = 0
	}

	return {
		state,
		notifications,
		notifActive,
		newChan,
		spectate,
		conv,
		increaseNotif,
		decreaseNotif,
		updateSection,
		openConv,
		resetState
	}
})
