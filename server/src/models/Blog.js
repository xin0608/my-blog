// Blog Model
const mongoose = require('../db/db');

// ① 博客表blog（blogId，title，content，postTime，userId）
const Schema = mongoose.Schema({
    title: String,
    content: String,
    username: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('blog', Schema);
module.exports = Blog;