import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // 🔥 Chat model se relation
      required: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      enum: ["user", "ai"], // 🔥 sirf yehi values allow
      required: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;