'use strict';

const Service = require('egg').Service;

class TestService extends Service {
  async test(params) {
    const {test} = params;
    return 'front api is ok! Your args is ' + test;
  }
}

module.exports = TestService;
