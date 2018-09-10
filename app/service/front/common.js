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

  async getProvinceList(params) {
    let send_json = {};
    let result_obj = {};
    const { ctx } = this;
    const search_obj = {
      delete_status: 0,
    };
    const sql_opt = {
      where: search_obj,
      attributes: ['province_code', 'province_name']
    };
    const search_province_result = await ctx.model.JhwProvince.findAll(sql_opt);
    result_obj = {
      province_list: search_province_result
    };
    send_json = ctx.helper.getApiResult(0, "查询成功", result_obj);
    return send_json;
  }

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
  async getCityList(param) {
    let send_json = {};
    let result_obj = {};
    const { ctx } = this;
    const { province_code = "000000" } = param;
    const search_obj = {
      delete_status: 0
    };
    if(province_code !== "000000") {
      search_obj.province_code = province_code;
    }
    const search_sql = {
      where: search_obj,
      attributes: ['city_code', 'city_name']
    };
    const city_search_result = await ctx.model.JhwCity.findAll(search_sql);
    result_obj = {
      province_list: city_search_result
    };
    send_json = ctx.helper.getApiResult(0, "查询成功", result_obj);
    return send_json;
  }



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

   async getAreaList(params) {
    let send_json = {};
    let result_obj = {};
    const { ctx } = this;
    const { city_code = "000000" } = params;
    const search_obj = {
      delete_status: 0
    };
    if(city_code !== "000000") {
      search_obj.city_code = city_code;
    }
    const search_sql = {
      where: search_obj,
      attributes: ['area_code', 'area_name']
    };
    const area_search_result = await ctx.model.JhwArea.findAll(search_sql);
    result_obj = {
      area_list: area_search_result
    };
    send_json = ctx.helper.getApiResult(0, "查询成功", result_obj);
    return send_json;
   }

   /**
    * @api {post} /front/api/common/userLogin userLogin——用户登录
    * @apiName userLogin
    * @apiGroup Common
    * @apiVersion 0.1.0
    * 
    * 
    * @apiParam {string} email_address 邮箱地址(*) 
    * @apiParam {string} user_name 用户名(*) 
    * @apiParam {string} telephone 手机号(*)(仍选其一用于登录)
    * @apiParam {string} user_pwd 用户密码
    * 
    * 
    * @apiSuccess {string} user_id 用户id
    * @apiSuccess {string} user_name 用户名
    */
  async userLogin(params) {
    let result_obj = {};
    let send_json = {};
    const { ctx, app } = this;
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
        const token = app.jwt.sign({
        }, app.config.jwt.secret);
        result_obj = {
          token: token,
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
