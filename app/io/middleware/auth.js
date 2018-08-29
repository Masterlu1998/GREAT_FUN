module.exports = app => {
  return async (ctx, next) => {
    console.log('connected!');
      ctx.socket.emit('chat', 'connected!');
      await next();
      // execute when disconnect.
      console.log('disconnection!');
  };
};