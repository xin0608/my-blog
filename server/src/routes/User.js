// User Router
const router = require('koa-router')()
const { register, login } = require('../controller/User');

router.prefix('/api/user');

// 注册
router.post('/register', async (ctx, next) => {
    const { username, password } = ctx.request.body;

    try {
        const newUser = await register(username, password);
        ctx.body = {
            errno: 0,
            data: newUser
        }
    } catch (ex) {
        console.error(ex);
        ctx.body = {
            errno: 10001,
            message: `注册失败 - ${ex.message}`
        }
    }

})
// 登录
router.post('/login', async (ctx, next) => {
    const { username, password } = ctx.request.body;

    const res = await login(username, password)
    if (res) {
        // 查找记录不为空，登录成功
        // 设置session
        ctx.session.userInfo = { username }
        ctx.body = {
            errno: 0,
            message: '登录成功'
        }
    } else {
        ctx.body = {
            errno: 10002,
            message: `登录验证失败`
        }
    }
})

module.exports = router;