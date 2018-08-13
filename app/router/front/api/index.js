module.exports = app => {

  const { router, controller } = app;
  const index =  controller.front.api.index;
  const base_path = '/front/api/';
  router.post(base_path+':subclass/:fun',index.home);
};