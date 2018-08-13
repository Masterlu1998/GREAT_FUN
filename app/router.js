'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //前端渲染路由
  require('./router/front/web/test')(app);


  //前台api
  require('./router/front/api/index')(app);


};
