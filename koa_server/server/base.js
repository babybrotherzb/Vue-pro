const fs = require('fs'); 
const Koa = require('koa');
const route = require('koa-route');//路由
const Static = require('koa-static');//引入静态资源
const koaBody = require('koa-body');//接收参数
const compose = require('koa-compose');//合成const
const path = require('path');
const Config = require('./config')
const app = new Koa();
const ROOTPATH = './';
const SRC = '../src/commpoents'


//页面路由
const login = async(ctx) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  if (ctx.request.accepts('xml')) {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(`../src/commpoents/login.html`); //创建模块
  } else if (ctx.request.accepts('json')) {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello World Json' };
  } else {
    ctx.response.type = 'text';
    ctx.response.body = '你好啊text';
  }
};

const home = async(ctx) => {
    ctx.response.type = await 'html';
    ctx.response.body = await fs.createReadStream(`../src/commpoents/template.html`);
}

const host = async(ctx) => {
  ctx.response.type = await 'html'
  ctx.response.body = await fs.createReadStream(`../src/commpoents/host.html`)
}

const error = ctx => {
  ctx.throw(404);

  ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
};

app.on('error', (err, ctx) => {
  console.error('server error', err);
});

//登录接口
const form = async(ctx,data) => {
  var files = fs.readdirSync(__dirname + '../src/commpoents');
  var js_files = files.filter((f) => {
      return f.endsWith('.html');
  });
  
  try {
  if(JSON.parse(ctx.request.body).name=='张宝'&&JSON.parse(ctx.request.body).password=='666666'){
    
    let token = {
      'name':JSON.stringify(JSON.parse(ctx.request.body).name),
      'password':JSON.stringify(JSON.parse(ctx.request.body).password)
    }
    ctx.cookies.set('token',JSON.stringify(token));
    console.log(token,token.toString())
    ctx.response.body = {
      code:200,
      data:{
        name:JSON.parse(ctx.request.body).name,
        password:JSON.parse(ctx.request.body).password
      },
      msg:'登录成功'
    }
    // ctx.response.redirect('/home');//重定向

    // ctx.cookies.get('token')
    // ctx.cookies.set('token',ctx.request.body)
  //重定向 redirect
  // ctx.response.redirect('/home')
  }else{
    // ctx.app.emit('error', err, ctx);//用法类似
    
  ctx.response.body = {
    code:500,
    msg:'登录失败,用户名密码错误'
  }
  }
} catch (err){
  ctx.response.status = err.statusCode || err.status || 500;
  ctx.response.body = {
    message: err.message
  };
  // ctx.app.emit('error', err, ctx);  //用法类似
}
  
}
//静态资源
const main = Static(path.join(__dirname,`${ROOTPATH}content`))

const src = Static(path.join(__filename,'../src/commpoents'))

//重定向
// app.use(route.get('/redirect'),redirect)

//获取接口数据
app.use(koaBody());

//静态资源
app.use(main)
app.use(src)

//页面路由
app.use(route.get('/',login));
app.use(route.get('/home',home));
app.use(route.get('/host',host));

//接口
app.use(route.post('/form',form));
app.listen(Config.server.port);
