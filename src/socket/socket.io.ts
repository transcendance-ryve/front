import { io } from "socket.io-client";

export const useSocketIO = () => {
	const	socket = io('ws://localhost:3000', { withCredentials: true, })

	return {
		socket,
	}
}