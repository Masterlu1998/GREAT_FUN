'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //前端渲染路由
  require('./router/front/test')(app);




  
  //后台api
  router.post('/back/api', controller.back.api.index.back);
  //前台api
  router.post('/front/api', controller.front.api.index.front);


};
