module.exports = app => {
  class Controller extends app.Controller {
    async ping() {
      const message = this.ctx.args[0];
      console.log(this.ctx.args[0]);
      const {room, msg} = message;
      await this.ctx.server.sockets.emit(room, msg);
      // await this.ctx.socket.emit(room, msg);
    }
  }
  return Controller;
};
