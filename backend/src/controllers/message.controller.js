import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.js";
import User from "../models/user.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); // Fetch All User Without Me

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts", error);
    res.status(500).json("Internal server error", error);
  }
};
export const getChatsPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    //find all messages where the logged-in user is either sender or reciver
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });
    const chatPartnersId = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId.toString()
            ? msg.receiverId.toString()
            : msg.senderId.toString()
        )
      ),
    ];

    const chatParteners = await User.find({
      _id: { $in: chatPartnersId },
    }).select("-password");

    res.status(200).json(chatParteners);
  } catch (error) {
    console.log("Error in getChatsPartners controller", error);
    res.status(500).json("Internal server error", error);
  }
};
export const getMessagesByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesByUserId", error);
    res.status(500).json("Internal server error", error);
  }
};
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const { _id: senderId } = req.user._id;

    if (!text && !image) {
      return res.status(400).json({ message: "Text Or Image is required" });
    }

    if (senderId.equals(receiverId)) {
      return res
        .status(400)
        .json({ message: "Cannot send message to yourself" });
    }

    const receiverExist = await User.find({ _id: receiverId });
    if (!receiverExist) {
      return res.status(400).json({ message: "Receiver not found" });
    }

    let imageUrl;
    if (image) {
      //upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller", error);
    res.status(500).json("Internal server error", error);
  }
};
