const router = require('koa-router')()

const tokens = require('./token').tokens
const users = require('./token').users

router.prefix('/user');


router.get('/list', function (ctx, next) {
  ctx.body = {
    status: 0,
    users: Object.values(users),
  };
})

router.post('/delete', function (ctx, next) {
  const { id } = ctx.request.body;
  const token = tokens[id];
  if (token) {
    delete tokens[id];
    delete users[token];
  }
  ctx.body = {
    status: 0,
  };
})

router.post('/edit', function (ctx, next) {
  const data = ctx.request.body;
  const { id } = data;
  const token = tokens[id];
  if (token) {
    users[token] = { ...users[token], ...data };
  }
  ctx.body = {
    status: 0,
  };
})

router.post('/add', function (ctx, next) {
  const data = ctx.request.body;
  const { id } = data;
  tokens[id] = `${id}-token`;
  users[`${id}-token`] = {
    ...users["guest-token"],
    ...data,
  };
  ctx.body = {
    status: 0,
  };
})

router.post('/validateUserID', function (ctx, next) {
  const userID = ctx.request.body;
  const token = tokens[userID];
  if (token) {
    ctx.body = {
      status: 1,
    };
  } else {
    ctx.body = {
      status: 0,
    };
  }
})




module.exports = router;
