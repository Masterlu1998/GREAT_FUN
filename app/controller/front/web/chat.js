/**
 * Created by grovekingli on 2018/9/18.
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    //发现页面
    async chat() {
    await this.ctx.render('chat', {}, {layout: 'layout.html'});
}

    // async activityDetail() {
    // await this.ctx.render('activityDetail', {}, {layout: 'layout.html'});
// }
}

module.exports = HomeController;