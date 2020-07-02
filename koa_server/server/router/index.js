const Router = require("koa-router");
const router = new Router();
//页面路由
router.post('/login',async (ctx) =>{
  console.error(process.env.NODE_ENV,process.env.HOSTS,'process.env1111111111111111111111111')
  ctx.body = {
    code:200,
    data:{
      name:ctx.request.body.name,
      age:ctx.request.body.age,
      pass:ctx.request.body.pass
    },
    msg:'登录成功'
  }
        // await ctx.render("home", {
            // env: process.env.NODE_ENV,
            // title: "home",
            // port: Config.hotServer.port,
            // global,
            // _manifest: encodeURIComponent(JSON.stringify(_manifest))
        // });
})

router.get('/home', async(ctx) => {
      await ctx.render("home", {
    });
  })


  router.get('/host',async(ctx) => {
    await ctx.render("host", {
    });
  })

  //登录接口
  router.post('/form',async(ctx,data) => {
    var files = fs.readdirSync(__dirname + '../src/commpoents');

    // var js_files = files.filter((f) => { 过滤返回末尾是html的文件
    //     return f.endsWith('.html');
    // });
    
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
    
  })

  //装载所有子路由
  module.exports = router.routes();