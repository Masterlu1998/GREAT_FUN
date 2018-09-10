/**
 * Created by grovekingli on 2018/9/7.
 */
'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    //个人中心页面
    async userInfoMy() {
        await this.ctx.render('userCenter', {}, {layout: 'layout.html'});
    }
    async userInfoOthers() {
        await this.ctx.render('userCenterOthers', {}, {layout: 'layout.html'});
    }
}
module.exports = HomeController;