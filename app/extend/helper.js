const CONSTANT = require('../public/common/constant');

/** 
*api成功的返回调用函数
* @param [string] prompt: 需要返回的用户提示信息
* @param [object] jsonData: 需要返回的json格式出参（可省略）
*/
exports.success = function(prompt, jsonData = {} ) {
  const JSON_RESULT = JSON.parse(JSON.stringify(CONSTANT.API_RESULT_MODEL));  
  // 判断入参是否为json格式
  if(typeof(jsonData) !== "object") {
    throw Error('jsonData is not an object!');
  }
  // 为json格式则将出参写入JSON_RESULT中
  JSON_RESULT.msg.prompt = prompt;
  JSON_RESULT.obj = jsonData;
  return JSON_RESULT;
};


/**
 * api失败的返回调用函数
 * @param [int] retcode: 返回的状态代码
 * @param [string] prompt: 给用户的错误提示信息
 * @param error: 抛出的错误实例（可省略）
 */
exports.failed = function(retcode, prompt, error) {
  const JSON_RESULT = JSON.parse(JSON.stringify(CONSTANT.API_RESULT_MODEL));
  JSON_RESULT.retcode = retcode;
  //存在node.js错误对象则输出错误信息
  if(typeof(error) !== "undefined") {
    JSON_RESULT.msg.error = error.message;
  }
  JSON_RESULT.msg.prompt = prompt;
  return JSON_RESULT;
};