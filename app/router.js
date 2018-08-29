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


  router.get('/', controller.front.web.home.chat);

  // socket.io
  io.route('chat', io.controller.chat.ping);
};
