// 连接数据库

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017' //本地默认的mongodb服务地址
const dbName = 'myBlog' //数据库名称

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

// 开始连接
mongoose.connect(`${url}/${dbName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// 连接对象
const db = mongoose.connection;
db.on('error', err => {
    console.error('mongoose connect error', err);
})

// 测试是否连接成功
// db.once('open', () => {
//     console.log('mongoose 连接成功');
// })
module.exports = mongoose;