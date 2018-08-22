'use strict';

const Service = require('egg').Service;
const constant = require('../../public/common/constant');
const moment = require('moment');
const underscore=require('underscore');
const sequelize=require('sequelize');

class CommonService extends Service {
  /**
   * @api {post} /front/api/common/getProvinceList getProvinceList——获取省份列表
   * @apiName getProvinceList
   * @apiGroup Common
   * @apiVersion 0.1.0
   * 
   * 
   * @apiSuccess {list} province_list 省份列表
   * @apiSuccess {string} province_code 省份code
   * @apiSuccess {string} province_name 省份名称
   */



  /**
   * @api {post} /front/api/common/getCityList getCityList——获取城市列表
   * @apiName getCityList
   * @apiGroup Common
   * @apiVersion 0.1.0
   * 
   * 
   * @apiParam {string} province_code = "ALL" 省份code(*)
   * 
   * 
   * @apiSuccess {list} province_list 城市列表
   * @apiSuccess {string} city_code 城市code
   * @apiSuccess {string} city_name 城市名称
   */



  /**
   * @api {post} /front/api/common/getAreaList getAreaList——获取区域列表
   * @apiName getAreaList
   * @apiGroup Common
   * @apiVersion 0.1.0
   * 
   * 
   * @apiParam {string} city_code = "ALL" 城市code(*)
   * 
   * 
   * @apiSuccess {list} province_list 城市列表
   * @apiSuccess {string} area_code 区域code
   * @apiSuccess {string} area_name 区域名称
   */


   /**
    * @api {post} /front/api/common/userLogin userLogin-用户登录
    * @apiName userLogin
    * @apiGroup Common
    * @apiVersion 0.1.0
    * 
    * 
    * @apiParam {string} email_address(*)
    * @apiParam {string} user_name(*)
    * @apiParam {string} telephone(*)(仍选其一用于登录)
    * @apiParam {string} user_pwd
    * 
    * 
    * @apiSuccess {string} user_id
    * @apiSuccess {string} user_name
    */
  async userLogin(params) {
    let result_obj = {};
    let send_json = {};
    const { ctx } = this;
    const { email_address = "", user_name = "", telephone = "", user_pwd } = params;
    const search_obj = {
      delete_status: 0
    };
    if(email_address) {
      search_obj.email_address = email_address;
    }
    if(user_name) {
      search_obj.user_name = user_name;
    }
    if(telephone) {
      search_obj.telephone = telephone;
    }
    const sql_option = {
      where: search_obj,
      attributes: ['user_pwd', 'user_id', 'user_name']
    };
    const search_user = await ctx.model.JhwUser.findOne(sql_option);
    if(!search_user) {
      send_json = ctx.helper.getApiResult(-1, "无此用户");
    } else {
      if(search_user.user_pwd !== user_pwd) {
        send_json = ctx.helper.getApiResult(-2, "账户或密码错误");
      } else {
        result_obj = {
          user_id: search_user.user_id,
          user_name: search_user.user_name
        };
        send_json = ctx.helper.getApiResult(0, "登陆成功", result_obj);
      }
    }
    return send_json;
  }
}

module.exports = CommonService;
