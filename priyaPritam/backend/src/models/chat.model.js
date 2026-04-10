import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // 🔥 User model se relation
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const chatModel = mongoose.model("Chat", chatSchema);

export default chatModel;