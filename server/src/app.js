const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const cors = require('koa2-cors')

const user = require('./routes/User')
const blog = require('./routes/Blog')
const comment = require('./routes/Comment')

// error handler
onerror(app)


// cors 配置跨域
app.use(cors({
    origin: 'http://localhost:8080', //前端origin
    credentials: true //允许跨域带cookie
}))

// session 配置
app.keys = ['sxinoaHHI99ss'] //秘钥，用于cookie加密
app.use(session({
    // 配置cookie
    cookie: {
        path: '/',
        httpOnly: true,//只能通过后端修改cookie,不允许前端js修改
        maxAge: 24 * 60 * 60 * 1000
    }
}))

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
app.use(comment.routes(), comment.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app;