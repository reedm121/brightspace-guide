import { create } from "zustand";
import type { ChatMessage } from "@/types/content";

interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isLoading: boolean;
  currentPage: string | null;
  addMessage: (message: Omit<ChatMessage, "id" | "timestamp">) => void;
  setOpen: (open: boolean) => void;
  setLoading: (loading: boolean) => void;
  setCurrentPage: (page: string | null) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  currentPage: null,
  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),
  setOpen: (open) => set({ isOpen: open }),
  setLoading: (loading) => set({ isLoading: loading }),
  setCurrentPage: (page) => set({ currentPage: page }),
  clearMessages: () => set({ messages: [] }),
}));
