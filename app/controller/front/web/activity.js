'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  //发现页面
  async discovery() {
        await this.ctx.render('discovery', {}, {layout: 'layout.html'});
  }
}

module.exports = HomeController;