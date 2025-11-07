import React from "react";
import { useAuthStore } from "../store/useAuthStore";

const ChatPage = () => {
  const { logout } = useAuthStore();
  return (
    <div className="z-20">
      <p>ChatPage</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ChatPage;
