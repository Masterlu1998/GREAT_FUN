'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async chat() {
    await this.ctx.render('chat', {}, {layout: null});
  }

  async chat2() {
    await this.ctx.render('chat2', {}, {layout: null});
  }

  //发现页面
  async discovery() {
        await this.ctx.render('discovery', {}, {layout: null});
  }
}

module.exports = HomeController;
