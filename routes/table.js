const router = require('koa-router')();
const Mock = require('mockjs');


let List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: i,
      title: "@ctitle(5, 10)",
      author: "@cname",
      readings: "@integer(300, 5000)",
      "star|1-3": "★",
      "status|1": ["published", "draft"],
      date: "@datetime",
    })
  );
}

router.prefix('/table');

router.post('/list', function (ctx, next) {
  const { pageNumber, pageSize, title, status, star } = ctx.request.body;
  let start = (pageNumber - 1) * pageSize;
  let end = pageNumber * pageSize;
  let mockList = List.filter((item) => {
    if (star && item.star.length !== star) return false;
    if (status && item.status !== status) return false;
    if (title && item.title.indexOf(title) < 0) return false;
    return true;
  });
  let pageList = mockList.slice(start, end);
  ctx.body = {
    code: 20000,
    data: {
      total: mockList.length,
      items: pageList,
    },
  };
});

router.post('/delete', function (ctx, next) {
  const { id } = ctx.request.body;
  const item = List.filter((item) => item.id === id);
  const index = List.indexOf(item[0]);
  List.splice(index, 1);
  ctx.body = {
    code: 20000,
  };
});

router.post('/edit', function (ctx, next) {
  const data = ctx.request.body;
  const { id } = data;
  const item = List.filter((item) => item.id === id);
  const index = List.indexOf(item[0]);
  List.splice(index, 1, data);
  ctx.body = {
    code: 20000,
  };
});

module.exports = router;
