// Blog Router
const router = require('koa-router')()

const { createArticel, updateArticle, getArticleList, getArticleById, deleteArticleById } = require('../controller/Blog')

router.prefix('/api/article')

// RESTful API

// 创建文章
router.post('/', async (ctx, next) => {
    const username = ctx.session.userInfo.username;
    const { title, Htmlcontent, Markdowncontent, isDraft } = ctx.request.body;
    //    创建时捕获异常
    try {
        const newArticle = await createArticel(username, title, Htmlcontent, Markdowncontent, isDraft);
        ctx.body = {
            errno: 0,
            data: newArticle
        }
    } catch (ex) {
        console.log(ex)
        ctx.body = {
            errno: 10003,
            message: `创建文章失败 - ${ex.message}`
        }
    }

})

// 修改文章
router.post('/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const { title, Htmlcontent, Markdowncontent, isDraft } = ctx.request.body;
    const newArticle = await updateArticle(id, title, Htmlcontent, Markdowncontent, isDraft);
    ctx.body = {
        errno: 0,
        data: newArticle
    }
})

// 删除文章
router.delete('/:id', async (ctx, next) => {
    const id = ctx.params.id;
    await deleteArticleById(id);
    // 返回新的文章列表
    const username = ctx.session.userInfo.username;
    const list = await getArticleList(username);
    ctx.body = {
        errno: 0,
        data: list
    }
})

// 查询文章列表
router.get('/', async (ctx, next) => {
    const username = ctx.session.userInfo.username;
    const list = await getArticleList(username);
    ctx.body = {
        errno: 0,
        data: list
    }
})

// 查询单篇文章
router.get('/:id', async (ctx, next) => {
    const id = ctx.params.id;
    const res = await getArticleById(id);
    ctx.body = {
        errno: 0,
        data: res
    }
})

module.exports = router