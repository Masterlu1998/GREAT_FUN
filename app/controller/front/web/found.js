'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async found() {
        await this.ctx.render('found', {}, {layout: 'layout.html'});
    }
}

module.exports = HomeController;