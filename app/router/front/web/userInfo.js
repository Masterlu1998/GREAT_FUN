/**
 * Created by grovekingli on 2018/9/7.
 */
//用户中心相关
module.exports = app => {
    const { router, controller } = app;
    router.get('/front/web/user/my', controller.front.web.userInfo.userInfoMy);
    router.get('/front/web/user/other', controller.front.web.userInfo.userInfoOthers);
};