// User Controller

const User = require('../models/User');

// 注册--创建数据
async function register(username, password) {
    const newUser = await User.create({ username, password });
    return newUser;
}

// 登录--查询数据
async function login(username, password) {
    const res = await User.findOne({ username, password });
    if (res != null) {
        // 登录成功
        return true;
    }
    // 查无此人，登录失败
    return false;
}

module.exports = { register, login }