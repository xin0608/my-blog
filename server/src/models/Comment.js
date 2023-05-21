// Comment Model
const mongoose = require('../db/db')

const Schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    comment: String,
    commentator: { //评论人
        type: String,
        required: true
    },
    isAnonymous: { //是否匿名
        type: Boolean,
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.model('comment', Schema);
module.exports = Comment;