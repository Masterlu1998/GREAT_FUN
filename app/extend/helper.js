const CONSTANT = require('../public/common/constant');
const uuid = require('node-uuid');
const moment = require('moment');

/**
 * api通用的返回调用函数
 * @param [int] retcode: 返回的状态代码
 * @param [string] prompt: 给用户的错误提示信息
 * @param [object] jsonData: 需要返回的json格式出参（可省略） 
 * @param error: 抛出的错误实例（可省略）
 */
exports.getApiResult = function() {
  //  校验固定入参格式
  if(typeof(arguments[0]) !== 'number') {
    throw Error('The first argument is not a number!');
  }
  if(typeof(arguments[1]) !== 'string') {
    throw Error('The second argument is not String');
  }

  //  固定入参赋值
  var retcode = arguments[0];
  var prompt = arguments[1];

  //  定义返回值
  var JSON_RESULT = JSON.parse(JSON.stringify(CONSTANT.API_RESULT_MODEL));
  JSON_RESULT.retcode = retcode;
  JSON_RESULT.msg.prompt = prompt;
  if(arguments[0] >= 0) {
    //  表示成功返回
    //  校验返回数据
    var jsonData;
    if(arguments[2] instanceof Object) {
      jsonData = arguments[2];
    } else if(!arguments[2]) {
      jsonData = {};
    } else {
      throw Error('The jsonData is not an object!');
    }
    JSON_RESULT.obj = jsonData;
    return JSON_RESULT;
  } else if(arguments[0] < 0) {
    //  表示失败返回
    var error;
    if(arguments[2] instanceof Error) {
      error = arguments[2];
    } else if(!arguments[2]) {
      error = "";
    } else {
      throw Error('The error is not an error type!');
    }
    JSON_RESULT.msg.error = error.message;
    return JSON_RESULT;
  }
};


/**
 * 生成uuid
 */
exports.getUUID = () => {
    const id = uuid.v1().split('-').join('');
    return id;
};