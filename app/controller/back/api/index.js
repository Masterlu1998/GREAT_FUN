'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  //后端api
  async back() {
    //提取apicode
    const apicode = this.ctx.request.body.apicode;
    const backApiPath = this.ctx.service.back;
    //提取入参args
    const args = this.ctx.request.body.args;
    //打印入参详情
    console.log("\x1b[32mapicode: " + apicode);
    console.log("\x1b[32margs: " + JSON.stringify(args));
    let result;
    //分配逻辑层处理函数
    switch(apicode) {
      //测试路由
      case 'test':
      result = await backApiPath.test.test(args);
    }
    //返回出参
    this.ctx.body = result;
  }
 
}

module.exports = IndexController;
