'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
  //前端渲染路由
  require('./router/front/web/test')(app);
  //文件上传路由
  require('./router/front/web/file')(app);

  //前台api
  require('./router/front/api/index')(app);


  router.get('/chat', controller.front.web.home.chat);
  router.get('/chat2', controller.front.web.home.chat2);

  //发现页面
  router.get('/discovery', controller.front.web.home.discovery);

  // socket.io
  io.route('chat', io.controller.chat.ping);
};
