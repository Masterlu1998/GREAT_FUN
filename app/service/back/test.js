'use strict';

const Service = require('egg').Service;

class ApiTestService extends Service {
  async test(params) {
    const {test} = params;
    const { ctx } = this;
    let searchResult = await ctx.model.FunUser.findAll();
    return searchResult;
  }
}

module.exports = ApiTestService;
