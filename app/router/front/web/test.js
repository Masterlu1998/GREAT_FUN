module.exports = app => {
  const { router,  controller} = app;

  //前端渲染测试路由
  router.get('/front', controller.front.web.frontTest.test);

};