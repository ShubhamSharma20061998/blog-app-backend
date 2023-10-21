<<<<<<< HEAD
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
=======
const Comment = require('../models/comment-model')
const _ = require('lodash')
const commentsCltr = {}

commentsCltr.list = async (req, res) => {
    try {
        const comments = await Comment.find({ status: 'pending'})
        res.json(comments)
    } catch(e) {
        res.json(e)
    }
} 

commentsCltr.approve = async (req, res) => {
    const id = req.params.id 
    try {
        const comment = await Comment.findByIdAndUpdate(id, { status: 'approved'}, { new: true })
        res.json(comment) 
    } catch(e) {
        res.json(e)
    }
}

commentsCltr.create = async (req, res) => {
    const bId = req.params.bId 
    const body = _.pick(req.body, ['body'])
    try {
        const comment = new Comment(body) 
        comment.blogId = bId 
        comment.userId = req.user.id 
        await comment.save()
        res.json(comment) 
    } catch(e) {
        res.json(e) 
    }
} 

commentsCltr.update = async (req, res) => {
    // const bId = req.params.bId
    // const cId = req.params.cId 
    const { bId, cId } = req.params 
    const body = req.body 
    try {
        if(req.user.role == 'user') {
            const comment = await Comment.findOneAndUpdate({ _id: cId, userId: req.user.id, blogId: bId }, body, { new: true}) 
            res.json(comment)
        } else if(req.user.role == 'moderator') {
            const comment = await Comment.findOneAndUpdate({ _id: cId, blogId: bId }, body, { new: true })
            res.json(comment) 
        }
    } catch(e) {
        res.json(e)
    }
} 

commentsCltr.remove = async (req, res) => {
    const { bId, cId } = req.params
    try {
        if (req.user.role == 'user') {
            const comment = await Comment.findOneAndDelete({ _id: cId, userId: req.user.id, blogId: bId })
            res.json(comment)
        } else if (req.user.role == 'moderator') {
            const comment = await Comment.findOneAndDelete({ _id: cId, blogId: bId })
            res.json(comment)
        }
    } catch (e) {
        res.json(e)
    } 
} 

module.exports = commentsCltr 
>>>>>>> d47d7b232695ddb7cec5d4930e3b3bf468cc77a3
