const keyStrokeSounds = [
  new Audio("sounds/frontend_public_sounds_keystroke1.mp3"),
  new Audio("sounds/frontend_public_sounds_keystroke2.mp3"),
  new Audio("sounds/frontend_public_sounds_keystroke3.mp3"),
  new Audio("sounds/frontend_public_sounds_keystroke4.mp3"),
];

const useKeyboardSound = () => {
  const playRandomKeyStrokesSound = () => {
    const randomSound =
      keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];
    randomSound.currentTime = 0; // THIS IS FOR BETTER UX
    randomSound
      .play()
      .catch((error) => console.log("Audio play failed", error));
  };
  return { playRandomKeyStrokesSound };
};

export default useKeyboardSound;
