"use client";

import { Dispatch, SetStateAction } from "react";
import { Message } from "@/app/content";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";

const ListItem = ({
  ind,
  title,
  selectedConversationId,
  selectConversationId,
}: {
  ind: number;
  title: string;
  selectedConversationId: number;
  selectConversationId: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <li>
      <div
        onClick={() => selectConversationId(ind)}
        className={`flex items-center p-2  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group cursor-pointer ${selectedConversationId === ind && "bg-gray-100"}`}>
        <svg
          className=" text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.529 9.988a2.502 2.502 0 1 1 5 .191A2.441 2.441 0 0 1 12 12.582V14m-.01 3.008H12M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        <Tooltip>
          <TooltipTrigger asChild>
            <span className="ms-3 truncate ...">{title}</span>
          </TooltipTrigger>
          <TooltipContent>{title}</TooltipContent>
        </Tooltip>
      </div>
    </li>
  );
};

const List = ({
  conversationsArr,
  selectedConversationId,
  selectConversationId,
}: {
  conversationsArr: any;
  selectedConversationId: number;
  selectConversationId: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
      <ul className="space-y-2 font-medium">
        {conversationsArr?.map((messages: Message[], ind: number) => {
          return (
            <ListItem
              key={`ListItem${ind}`}
              ind={ind}
              title={messages[0]?.userMessage || "New Conversation"}
              selectedConversationId={selectedConversationId}
              selectConversationId={selectConversationId}
            />
          );
        })}
      </ul>
    </div>
  );
};

export const Sidebar = ({
  conversationsArr,
  selectedConversationId,
  createNewConversation,
  selectConversationId,
}: {
  conversationsArr: any;
  selectedConversationId: number;
  createNewConversation: () => void;
  selectConversationId: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <aside
      id="default-sidebar"
      className="fixed left-0 z-60 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 dark:bg-gray-800">
        <div
          className="flex items-center p-2 bg-gray-500 text-white rounded-lg dark:text-white hover:bg-gray-400 dark:hover:bg-gray-700 group cursor-pointer"
          onClick={() => createNewConversation()}>
          <svg
            className="w-6 h-6 text-gray-900 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          <span className="ms-3">New Conversation</span>
        </div>
        <List
          conversationsArr={conversationsArr}
          selectedConversationId={selectedConversationId}
          selectConversationId={selectConversationId}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
