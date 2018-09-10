//活动相关路由
module.exports = app => {
    const { router, controller } = app;
    router.get('/front/web/activity/discovery', controller.front.web.activity.discovery);
    router.get('/front/web/activity/activityDetail', controller.front.web.activity.activityDetail);
};