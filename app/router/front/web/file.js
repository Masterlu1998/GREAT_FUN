module.exports = app => {
    const { router, controller } = app;

    router.post('/back/page/file/upload', controller.front.web.file.upload);
};