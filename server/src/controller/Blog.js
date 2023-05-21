// Blog Controller

const Blog = require('../models/Blog');

// 创建文章
async function createArticel(username, title, Htmlcontent, Markdowncontent, isDraft) {
    const newArticle = await Blog.create({ username, title, Htmlcontent, Markdowncontent, isDraft });
    return newArticle;
}

// 修改文章
async function updateArticle(id, title, Htmlcontent, Markdowncontent, isDraft) {
    const article = await Blog.findOneAndUpdate(
        { _id: id },//查询的条件
        { title, Htmlcontent, Markdowncontent, isDraft },//更新的数据
        { new: true }
    )
    return article;
}
// 查找文章
// 获取文章列表
async function getArticleList(username) {
    const list = await Blog.find({ username });
    return list;
}
// 获取单篇文章
async function getArticleById(id) {
    const article = await Blog.findById(id);
    return article;
}

// 删除文章
async function deleteArticleById(id) {
    await Blog.deleteOne({ '_id': id })

}

module.exports = {
    createArticel, updateArticle,
    getArticleList, getArticleById, deleteArticleById
}