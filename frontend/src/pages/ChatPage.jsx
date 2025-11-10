import { useChatStore } from "../store/useChatStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";

const ChatPage = () => {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-screen md:h-[800px] mx-auto p-5">
      <BorderAnimatedContainer>
        {/* Wrapper should be flex and full height */}
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* LEFT SIDE */}
          <div className="flex flex-col w-full md:w-1/3 bg-slate-800/50 backdrop-blur-sm border-b md:border-b-0 md:border-r border-slate-700/50">
            <ProfileHeader />
            <ActiveTabSwitch />

            {/* Scrollable user list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div
            className={` md:flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm h-full`}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
};

export default ChatPage;

/*
   <div className="relative w-full max-w-6xl h-screen md:h-[800px] mx-auto p-5 ">
      <BorderAnimatedContainer>
        <ProfileHeader />
        {!selectedUser ? (
          <div className="bg-slate-800/50 backdrop-blur-sm flex-col">
            <ActiveTabSwitch />
            <div className="flex-1 overflow-y-auto p-4 space-y-2 ">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm ">
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        )}
      </BorderAnimatedContainer>
    </div>
*/
