module.exports = app => {
  class Controller extends app.Controller {
    async ping() {
      const message = this.ctx.args[0];
      console.log(this.ctx.args[0]);
      const {targetId, msg} = message;
      await this.ctx.server.sockets.emit(targetId, msg);
    }
  }
  return Controller;
};
