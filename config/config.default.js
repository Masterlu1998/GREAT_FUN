'use strict';

module.exports = appInfo => {
  const config = exports = {};
  const path = require('path');

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1531643986056_5361';

  // add your config here
  config.middleware = [];

  exports.cluster = {
    listen: {
      port: 80,
      // hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    },
  };

  config.security = {
    csrf: false,
  };

  config.logger= {
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: 'egg-web.log',
    agentLogName: 'egg-agent.log',
    errorLogName: 'common-error.log',
  };

  config.sequelize = {
    dialect: 'mysql',
    database: 'GREAT_FUN',
    host: '116.62.156.102',
    port: '3306',
    username: 'greatfun',
    password: 'lixingyu666',
    timezone: '+08:00'
  };

  exports.bodyParser = {
    enable: true,
    encoding: 'utf8',
    formLimit: '50mb',
    jsonLimit: '50mb',
    strict: true,
    queryString: {
      arrayLimit: 100,
      depth: 5,
      parameterLimit: 1000,
    }
  };

  config.view = {
    //配置多个 view 目录
    root: [
        path.join(appInfo.baseDir, 'app/view'),
        path.join(appInfo.baseDir, 'app/public'),
    ].join(','),
    defaultViewEngine: 'ejs',
    defaultExtension: '.html',
    mapping: {
        '.ejs': 'ejs',
    },
  };

  return config;
};