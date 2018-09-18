/**
 * Created by grovekingli on 2018/9/18.
 */
//聊天室路由
module.exports = app => {
    const { router, controller } = app;
    router.get('/front/web/chat/chat', controller.front.web.chat.chat);
};