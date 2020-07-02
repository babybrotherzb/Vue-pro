const Koa = require('koa');
const Static = require('koa-static');//引入静态资源
const router = require('koa-router')();
const views = require("koa-views");
const koaBody = require('koa-body');//接收参数
const path = require('path');
const Config = require('../scirpt/config.js');
const Api = require('./router');
const staticpath = '../../src/static';
const distpath = '../dist/static';
const ROOT_PATH = '../';
const app = new Koa();

const { errorsLogger, accessLogger } = require("./logger/logger.js");

//静态资源
const main = Static(path.join(__dirname,staticpath))
const dist = Static(path.join(__dirname,distpath))


// view 模版
app.use(
  views(path.join(__dirname, `${ROOT_PATH}src/commpoents`), {
      extension: "html"
  })
);
// const redic = ctx =>{
//   ctx.response.redirect('/kapi')//重定向
// }
// app.use(redic)

//静态资源
app.use(main)
app.use(dist)
//日志打印记录
app.use(accessLogger());

app.on("error", err => {
  errorsLogger.error(err);
});

router.use('/kapi', Api);

app.use(koaBody({
  strict: true
}));

app.use(router.routes()).use(router.allowedMethods());

app.listen(Config.server.port,() =>{
  console.log(`127.0.0.1:${Config.server.port}`)
});
