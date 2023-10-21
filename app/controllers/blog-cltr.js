const _ = require("lodash");
const Blog = require("../models/blog-model");
const User = require("../models/user-model");
const blogctrl = {};

blogctrl.create = async (req, res) => {
  try {
    const body = _.pick(req.body, ["title", "content"]);
    const blog = new Blog(body);
    blog.author = req.user.id;
    await blog.save();
    // const user = await User.findById(blog.author);
    // user.createdBlogs.push(blog._id);
    // await user.save();
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { $push: { createdBlogs: blog._id } }
    );
    res.json(blog);
  } catch (e) {
    res.json(e);
  }
};

blogctrl.updateBlog = async (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ["title", "content"]);
  try {
    if (req.user.role == "author") {
      const blog = await Blog.findOneAndUpdate(
        { _id: id, author: req.user.id },
        body,
        {
          new: true,
        }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });
      res.json(blog);
    }
  } catch (e) {
    res.json(e);
  }
};

blogctrl.deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    if (req.user.role == "author") {
      const blog = await Blog.findOneAndDelete({
        _id: id,
        author: req.user.id,
      });
      await User.findByIdAndUpdate(blog.author, {
        $pull: { createdBlogs: blog._id },
      });
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndDelete(id);
      res.json(blog);
    }
  } catch (e) {
    res.json(e);
  }
};

blogctrl.unpublished = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "pending" });
    res.json(blogs);
  } catch (e) {
    res.json(e);
  }
};

blogctrl.changeStatus = async (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ["status"]);
  try {
    const blog = await Blog.findByIdAndUpdate(id, body, { new: true });
    res.json(blog);
  } catch (e) {
    res.json(e);
  }
};

blogctrl.list = async (req, res) => {
  try {
    const blogs = await Blog.find({ status: "approved" });
    res.json(blogs);
  } catch (e) {
    res.json(e);
  }
};

module.exports = blogctrl;
