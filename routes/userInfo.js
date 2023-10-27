const router = require('koa-router')()

const users = require('./token').users

router.prefix('/userInfo')


// 获取用户信息接口
router.post('/', async (ctx, next) => {
  console.log('body', ctx.request.body)
  const key = Object.keys(ctx.request.body)
  console.log('key', key[0])
  const token = ctx.request.body.token;
  console.log('userInfo-token', token)
  const userInfo = users[key];
  if (!userInfo) {
    ctx.body = {
      status: 1,
      message: "获取用户信息失败！",
    };
    return;
  }
  ctx.body = {
    status: 0,
    userInfo,
  };
});


module.exports = router
