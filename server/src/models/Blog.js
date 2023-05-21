// Blog Model
const mongoose = require('../db/db');


const Schema = mongoose.Schema({
    title: String,
    Htmlcontent: String,
    Markdowncontent: String,
    username: {
        type: String,
        required: true
    },
    isDraft://是否是草稿
    {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

const Blog = mongoose.model('blog', Schema);
module.exports = Blog;