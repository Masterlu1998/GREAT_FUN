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



  async echo() {
    
  }
}

module.exports = CommonService;
