'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

    async test() {
        await this.ctx.render('test', {}, {layout: null});
    }

    async main() {
        await this.ctx.render('main', {}, {layout: 'layout.html'});
    }

    // async aaa() {
    //     await this.ctx.render('1/2', {}, {layout: null});
    // }

}

module.exports = HomeController;
