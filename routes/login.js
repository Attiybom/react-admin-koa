// const loginApi = require('./login/index')
const router = require('koa-router')()
const tokens = require('./token').tokens

router.prefix('/login');


// 登录接口
router.post('/', async (ctx, next) => {
  const { username, password } = ctx.request.body;
  const token = tokens[username];
  console.log('username', username)
  console.log('token', token)
  if (!token) {
    ctx.body = {
      status: 1,
      message: "用户名或密码错误",
    };
    return;
  }
  // 根据用户名和密码验证
  if ((username === "admin" && password === "admin") ||
      (username === "editor" && password === "editor") ||
      (username === "guest" && password === "guest")) {
    ctx.body = {
      status: 0,
      message: '登录成功',
      token,
    };
  } else {
    ctx.body = {
      status: 1,
      message: "用户名或密码错误!!!",
    };
  }
})




module.exports = router;
