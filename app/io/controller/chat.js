module.exports = app => {
  class Controller extends app.Controller {
    async ping() {
      const message = this.ctx.args[0];
      console.log(this.ctx.args[0]);
      await this.ctx.server.sockets.emit('chat', message);
    }
  }
  return Controller;
};
