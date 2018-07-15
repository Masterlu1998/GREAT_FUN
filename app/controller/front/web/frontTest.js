'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

  async test() {
    await this.ctx.render('test', {}, {layout: null});
  }
}

module.exports = HomeController;
