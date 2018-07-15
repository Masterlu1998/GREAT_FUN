'use strict';

// had enabled by egg
// exports.static = true;


exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};