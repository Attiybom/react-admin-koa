const router = require('koa-router')()

router.prefix('/monitor')

router.post('/', function (ctx, next) {
  ctx.body = {
    status: 1,
    message: "monitor"
  };
})

module.exports = router
