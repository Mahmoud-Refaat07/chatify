import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { XIcon } from "lucide-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser, setIsMobile } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);
        setIsMobile();
      }
    };
    window.addEventListener("keydown", handleEscapeKey);
    // CLEAN UP
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-sla-800/50 border-b border-slate-700/50 max-h-[84px] px-6  flex-1">
      <div className="flex items-center space-x-y gap-2">
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.username}
            />
          </div>
        </div>
        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.username}
          </h3>
          <p className="text-slate-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button
        onClick={() => {
          setSelectedUser(null);
          setIsMobile();
        }}
      >
        <XIcon className="cursor-pointer w-5 h-5 text-slate-400 hover:text-slate-200 transition-colors" />
      </button>
    </div>
  );
};

export default ChatHeader;
