### 本项目是基于express封装的路由装饰器，可自动引入控制器，并以装饰器方式引入路由地址
`github 项目地址：`(https://github.com/by-night/decorator)  
#### 下载  
```
npm install night-decorator
```
### 1. 使用说明：  
#### 参数
*autoRouter(Router, [options])*   
* Router: 路由实例
* options: 路由配置 (可选参数)

*控制器路径:*  
* 默认为根目录的controller目录，可用过options的source 配置项修改
```
app.use(autoRouter(Router, {
    source: '/src/controller'
}));

```
### 2. 示例：
* 在根文件(一般为app.js) 中使用：
```
const express = require("express");
const autoRouter = require('night-decorator');
const app = express();
// 传入 express 的路由
app.use(autoRouter(new express.Router()));

app.listen('8888', () => {
    console.log(`server is running on port 8888`);
});
```
* 在根目录中创建控制器目录 control, 创建控制器文件
```
const {Post, Controller} = require('night-decorator/decorator');
 // 公共前缀
@Controller('/demo')
class Test {
    // 当前url（Post 请求）
    // 请求支持 Post,Get,Put,Delete,Use(请求拦截时使用)方式)
    @Post('/sayHello') 
    sayHello(req, res) {
        res.send('hello world');
    }
}

module.exports = Test;
```
###### 请求地址为:  
###### http://localhost:8888/demo/sayHello (Post 请求)

