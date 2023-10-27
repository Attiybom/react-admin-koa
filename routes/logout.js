const router = require('koa-router')()


router.prefix('/logout');


router.post('/', function (ctx, next) {
  ctx.body = {
    status: 0,
    data: "success",
  };
})




module.exports = router;
