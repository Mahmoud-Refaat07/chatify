import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";

const ContactList = () => {
  const {
    allContacts,
    getAllContacts,
    isUsersLoading,
    setSelectedUser,
    setIsMobile,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getAllContacts();
  }, [getAllContacts]);

  if (isUsersLoading) return <UserLoadingSkeleton />;

  return (
    <>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => {
            setSelectedUser(contact);
            setIsMobile();
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className={`avatar ${
                onlineUsers.includes(contact._id)
                  ? "avatar-online"
                  : "avatar-offline"
              }`}
            >
              <div className="size-12 rounded-full">
                <img
                  src={contact.profilePic || "/avatar.png"}
                  alt={contact.username}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {contact.username}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactList;
