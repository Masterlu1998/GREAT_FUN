//创建活动相关
module.exports = app => {
    const { router, controller } = app;
    router.get('/front/web/found', controller.front.web.found.found);
    router.get('/front/web/main', controller.front.web.frontTest.main);
};