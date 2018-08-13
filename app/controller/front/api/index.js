'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
 //前端api
 async home() {
  const pathName=this.ctx.params.fun;
  const subclass=this.ctx.params.subclass;
  //首字母小写
  const funName=pathName.replace(/(\w)/,function(v){return v.toLowerCase();});
  console.log(funName);
  this.ctx.logger.info('some request data: %j', this.ctx.request.body);
  let result;
  if(funName==='loginBack'){//后台登录路由单独处理，将管理员信息存入本地
      const args=this.ctx.request.body.args;
      const account=args.account;
      const password=this.ctx.helper.SHA1Hash(args.account,args.password);
      const ip=args.ip;
       result = await this.ctx.service.back.account.loginBack(account,password,ip);
       if(result!==null){
           this.ctx.session.backAuthorized=true; //用户认证通过
           this.ctx.session.adminName=result.obj.admin_name;//管理员用户名
           this.ctx.session.adminRoleId=result.obj.adminrole_id;//管理员角色信息
           this.ctx.session.adminId=result.obj.admin_id;//管理员id
           //获取管理员所属酒店id跟名称
           this.ctx.session.hotelId=result.obj.hotel_id;//管理员角色信息
           this.ctx.session.hotelName=result.obj.hotel_name;//管理员id
       }
    }
    else {
          result = await this.ctx.service.front[subclass][funName](this.ctx.request.body.args);
    }
    this.ctx.body = result;
  }
}

module.exports = IndexController;
