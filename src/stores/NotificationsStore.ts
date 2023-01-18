import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'

export interface notification { id: string, type: string, label: string, text: string, avatar: string, handleClick: Function | null }

export const useNotifStore = defineStore('notifStore', () => {
	const	notifs: notification[] = reactive([])
	const	pendingNotifs: notification[] = reactive([])

	const	addNotif = (type: string, label: string = '', text: string = '', avatar: string = '', handleClick: Function | null = null) => {
		const	id: string = new Date().getTime().toString()
		if (notifs.length >= 3)
			pendingNotifs.push({ id, type, label, text, avatar, handleClick })
		else
			notifs.push({ id, type, label, text, avatar, handleClick })
	}

	const	removeNotif = (id: string) => {
		notifs.splice(notifs.findIndex(notif => notif.id === id), 1)
	}

	watch(notifs, () => {
		if (notifs.length < 3 && pendingNotifs.length > 0) {
			notifs.push(pendingNotifs.shift() as notification)
		}
	})

	return {
		notifs,
		addNotif,
		removeNotif
	}
})