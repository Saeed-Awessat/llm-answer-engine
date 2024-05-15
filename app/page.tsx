"use client";
// 1. Import Dependencies
import { useEffect, useState } from "react";

//Sidebar
import { Sidebar } from "@/components/sidebar";

import Content from "./content";

export default function Page() {
  // 1. Set up state for the conversations
  const [conversationsArr, setConversationsArr] = useState<any[]>([]);
  // 2. Set up state for the selcted conversation
  const [selectedConversationId, setSelectedConversationId] =
    useState<number>(0);

  // 3. Set up the first conversation when the page has load
  useEffect(() => {
    if (!conversationsArr.length) createNewConversation();
  }, []);

  // 4. function for adding conversation and select it
  const createNewConversation = () => {
    const newConversationsArr = [...conversationsArr];
    newConversationsArr.push([]);
    setSelectedConversationId(newConversationsArr.length - 1);
    setConversationsArr(newConversationsArr);
  };

  return (
    <div>
      <Sidebar
        conversationsArr={conversationsArr}
        selectedConversationId={selectedConversationId}
        createNewConversation={createNewConversation}
        selectConversationId={setSelectedConversationId}
      />
      <Content
        conversationsArr={conversationsArr}
        setConversationsArr={setConversationsArr}
        selectedConversationId={selectedConversationId}
      />
    </div>
  );
}
