const Koa = require('koa')
const cors = require('koa2-cors');
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const userInfo = require('./routes/userInfo')
const login = require('./routes/login')
const monitor = require('./routes/monitor')
const remoteSearch = require('./routes/remoteSearch')
const excel = require('./routes/excel')
const table = require('./routes/table')
const logout = require('./routes/logout')
const user = require('./routes/user')


// error handler
onerror(app)

app.use(cors({
  origin: function(ctx) { // 设置允许来自指定域名请求
    if (ctx.url === '/test') {
      return '*'; // 允许来自所有域名请求
    }
    return 'http://localhost:3000'; // 只允许http://localhost:3000这个域名的请求
  },
  maxAge: 5, // 指定本次预检请求的有效期，单位为秒。
  credentials: true, // 是否允许发送Cookie
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // 设置所允许的HTTP请求方法
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'], // 设置服务器支持的所有头信息字段
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] // 设置获取其他自定义字段
}));


// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
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
app.use(index.routes(), index.allowedMethods())
app.use(userInfo.routes(), userInfo.allowedMethods())
app.use(login.routes(), login.allowedMethods())
app.use(monitor.routes(), monitor.allowedMethods())
app.use(remoteSearch.routes(), remoteSearch.allowedMethods())
app.use(excel.routes(), excel.allowedMethods())
app.use(table.routes(), table.allowedMethods())
app.use(logout.routes(), logout.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
