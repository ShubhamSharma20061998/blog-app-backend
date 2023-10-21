const _ = require("lodash");
const Comments = require("../models/comment-model");

const commentsCtrl = {};

commentsCtrl.list = async (req, res) => {
  try {
    const comments = await Comments.find({ status: "pending" });
    res.json(comments);
  } catch (e) {
    res.json(e);
  }
};

commentsCtrl.create = async (req, res) => {
  const bId = req.params.bId;
  const body = _.pick(req.body, ["body"]);
  try {
    const comment = new Comments(body);
    comment.userId = req.user.id;
    comment.blogId = bId;
    await comment.save();
    res.json(comment);
  } catch (e) {
    req.json(e);
  }
};

commentsCtrl.update = async (req, res) => {
  const { bId, cId } = req.params;
  const body = req.body;
  try {
      const comment = await Comments.findOneAndUpdate({_id:cId,});
      
  } catch (e) {}
};

commentsCtrl.remove = async (req, res) => {
  const bId = req.params.bId,
    cId = req.params.cId;
  try {
  } catch (e) {
    res.json(e);
  }
};

commentsCtrl.approve = async (req, res) => {
  const cId = req.params.CId;
  try {
    const comment = await Comments.findByIdAndUpdate();
  } catch (e) {}
};

module.exports = commentsCtrl;
