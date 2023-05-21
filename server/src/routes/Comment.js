// Comment Router
const router = require('koa-router')()

const { createComment, getCommentList, deleteCommentById } = require('../controller/Comment')
router.prefix('/api/comment')


// 创建留言
router.post('/', async (ctx, next) => {
    const username = ctx.session.userInfo.username;
    const { comment, commentator, isAnonymous } = ctx.request.body;
    //    创建时捕获异常
    try {
        const newComment = await createComment(username, comment, commentator, isAnonymous);
        ctx.body = {
            errno: 0,
            data: newComment
        }
    } catch (ex) {
        console.log(ex)
        ctx.body = {
            errno: 10003,
            message: `创建留言失败 - ${ex.message}`
        }
    }

})

// 查询留言列表
router.get('/', async (ctx, next) => {
    const username = ctx.session.userInfo.username;
    const list = await getCommentList(username);
    ctx.body = {
        errno: 0,
        data: list
    }
})

// 删除留言,只能删除关于自己的留言，即username是自己
router.delete('/:id', async (ctx, next) => {
    const username = ctx.session.userInfo.username;
    const id = ctx.params.id;
    await deleteCommentById(id, username);
    // 返回新的留言列表
    const list = await getCommentList(username);
    ctx.body = {
        errno: 0,
        data: list
    }
})




module.exports = router