"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { SearchDialog } from "@/components/search/SearchDialog";
import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { useChatStore } from "@/stores/chat-store";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen, setOpen } = useChatStore();

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header onToggleChat={() => setOpen(!isOpen)} isChatOpen={isOpen} />
      <div className="flex-1 items-start md:grid md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-[240px] shrink-0 border-r md:sticky md:block lg:w-[280px]">
          <ScrollArea className="h-full py-4">
            <Sidebar />
          </ScrollArea>
        </aside>
        <main className="relative py-6 lg:py-8">
          <div className="mx-auto w-full min-w-0 max-w-4xl px-6 md:px-8 lg:px-12">
            {children}
          </div>
        </main>
      </div>
      <SearchDialog />
      <ChatSidebar />
    </div>
  );
}
