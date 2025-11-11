import { useState, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";
import { LogOutIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";

const mouseClickSound = new Audio(
  "/sounds/frontend_public_sounds_mouse-click.mp3"
);

const ProfileHeader = () => {
  const { authUser, logout, updateProfile, isUpdatingProfileImage } =
    useAuthStore();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };
  return (
    <div className="p-6 border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        {/* LEFT SIDE: avatar + username */}
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar avatar-online">
            <button
              className="size-14 rounded-full overflow-hidden relative group cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              {isUpdatingProfileImage ? (
                <span className="loading loading-ring loading-xl"></span>
              ) : (
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="user image"
                  className="size-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <span className="text-white text-xs">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageUpload}
            />
          </div>

          {/* USERNAME & ONLINE TEXT */}
          <div>
            <h3 className="text-slate-200 font-medium text-base max-w-[180px] truncate">
              {authUser.username || authUser.updatedUser.username}
            </h3>
            <p className="text-slate-400 text-xs">Online</p>
          </div>
        </div>

        {/* RIGHT SIDE: buttons */}
        <div className="flex items-center gap-4">
          {/* LOGOUT BUTTON */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>

          {/* SOUND BUTTON */}
          <button
            className="text-slate-400 hover:text-slate-200 transition-colors"
            onClick={() => {
              mouseClickSound.currentTime = 0;
              mouseClickSound
                .play()
                .catch((error) => console.log("Audio play failed:", error));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
