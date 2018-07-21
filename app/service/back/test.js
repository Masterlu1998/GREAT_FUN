'use strict';

const Service = require('egg').Service;

class ApiTestService extends Service {
  async test( params ) {
    const { test } = params;
    const { ctx } = this;
    let searchResult = await ctx.model.FunUser.findAndCountAll();
    if(!searchResult) {
      ctx.helper.failed(-1, "查询成功");
    }

    //定义出参
    let resultObj = {
      count: searchResult.count,
      userList: searchResult.rows
    };


    let sendJson = ctx.helper.success("查询成功", resultObj);
    return sendJson;
  }
}

module.exports = ApiTestService;
