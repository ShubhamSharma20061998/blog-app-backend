const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const commentSchema = new Schema(
  {
    body: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Comments = model("Comments", commentSchema);
module.exports = Comments;
