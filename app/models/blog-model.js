const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const blogSchema = new Schema({
<<<<<<< HEAD
  title: String,
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "published", "reject"],
  },
});
=======
    title: String,
    content: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'reject']
    },
    lastEditedBy: {
        type: Schema.Types.ObjectId,
        default: null 
    }
})
>>>>>>> d47d7b232695ddb7cec5d4930e3b3bf468cc77a3

const Blog = model("Blog", blogSchema);

module.exports = Blog;
