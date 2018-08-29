'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async chat() {
    await this.ctx.render('chat', {}, {layout: null});
  }
}

module.exports = HomeController;
