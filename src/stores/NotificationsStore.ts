import { reactive } from 'vue'
import { defineStore } from 'pinia'

export interface notif { label: string, text: string, avatar: string, close: boolean }

export const useNotifStore = defineStore('notifStore', () => {
	const	notifs: notif[] = reactive([])

	return {
		notifs,
	}
})