// Comment Controller
const Comment = require('../models/Comment')

// 创建留言
async function createComment(username, comment, commentator, isAnonymous) {
    const newComment = await Comment.create({ username, comment, commentator, isAnonymous });
    return newComment;
}

// 查找留言
// 获取留言列表
async function getCommentList(username) {
    const list = await Comment.find({ username });
    return list;
}

// 删除留言
async function deleteCommentById(id, username) {
    await Comment.deleteOne({ '_id': id, 'username': username })

}

module.exports = {
    createComment, getCommentList, deleteCommentById
}