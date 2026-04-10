import { initSocketConnection } from "../services/chat.socket";
export function useChat()
{
    return {
        initSocketConnection
    }
}