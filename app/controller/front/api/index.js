'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
 //前端api
 async front() {
  //提取apicode
  const apicode = this.ctx.request.body.apicode;
  const frontApiPath = this.ctx.service.front;
  //提取入参args
  const args = this.ctx.request.body.args;
  //打印入参详情
  console.log("apicode: " + apicode);
  console.log("args: " + JSON.stringify(args));
  let result;
  //分配逻辑层处理函数
  switch(apicode) {
    //测试路由
    case 'test':
    result = await frontApiPath.test.test(args);
  }
  //返回出参
  this.ctx.body = result;
}
}

module.exports = IndexController;
