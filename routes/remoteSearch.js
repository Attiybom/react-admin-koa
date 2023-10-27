const router = require('koa-router')();
const Mock = require('mockjs');

const list = [];
const count = 20;

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    key: '@increment',
    order_no: '@guid()',
    price: '@float(1000, 15000, 0, 2)',
    'tag|1': ['success', 'pending']
  }));
}

router.prefix('/transaction');

router.get('/list', function (ctx, next) {
  ctx.body = {
    code: 20000,
    data: { items: list }
  };
});

module.exports = router;
