import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema({
  message: {
    type: String,
    minlength: 2,
    maxlength: 50,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

const Message = mongoose.models.messages || mongoose.model("messages", messagesSchema);

export default Message;
