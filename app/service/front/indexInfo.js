'use strict';

const Service = require('egg').Service;
const constant = require('../../public/common/constant');
const moment = require('moment');
const underscore=require('underscore');
const sequelize=require('sequelize');

class IndexInfoService extends Service {
  
  /**
   * @api {post} /front/api/indexInfo/getIndexBannerInfo getIndexBannerInfo——获取首页轮播图信息
   * @apiName getIndexBannerInfo
   * @apiGroup IndexInfo
   * @apiVersion 0.1.0
   * 
   * 
   * @apiSuccess {list} banner_list 首页banner列表
   * @apiSuccess {string} images_path 图片路径
   * @apiSuccess {string} images_url 图片跳转路由
   */
  async getIndexBannerInfo() {
    const json_res = JSON.parse(JSON.stringify(constant.API_RESULT_MODEL));
    json_res.msg.prompt = '查询成功';
    json_res.obj.banner_list = [
      { images_path: "https://source.unsplash.com/", images_url: "www.google.com" },
      { images_path: "https://source.unsplash.com/", images_url: "www.bing.com" }
    ];
    return json_res;
  }

  /**
   * @api {post} /front/api/indexInfo/getIndexActivityInfo getIndexActivityInfo——获取首页活动信息
   * @apiName getIndexActivityInfo
   * @apiGroup IndexInfo
   * @apiVersion 0.1.0
   * 
   * 
   * @apiSuccess {list} activity_list 首页活动列表 
   * @apiSuccess {string} activity_id 活动id 
   * @apiSuccess {string} activity_title 活动标题
   * @apiSuccess {string} activity_intro 活动简介
   * @apiSuccess {datetime} start_time 活动开始时间
   * @apiSuccess {datetime} end_time 活动结束时间
   */
  async getIndexActivityInfo() {
    const json_res = JSON.parse(JSON.stringify(constant.API_RESULT_MODEL));
    json_res.msg.prompt = '查询成功';
    json_res.obj.activity_list = [
      { activity_id: 1, activity_title: "越国朝圣", "activity_intro": "这是一次越国吃饭之旅！", start_time: "2018-08-12", end_time: "2018-08-20" },
      { activity_id: 2, activity_title: "越国朝圣", "activity_intro": "这是一次越国吃饭之旅！", start_time: "2018-08-12", end_time: "2018-08-20" }
    ];
    return json_res;
  }

  /**
   * @api {post} /front/api/indexInfo/getIndexUserInfo getIndexUserInfo——获取首页知名博主信息
   * @apiName getIndexUserInfo
   * @apiGroup IndexInfo
   * @apiVersion 0.1.0
   * 
   * 
   * @apiSuccess {list} user_list 首页知名博主列表 
   * @apiSuccess {string} user_id 博主id 
   * @apiSuccess {string} user_name 博主用户名
   * @apiSuccess {string} user_intro 博主简介
   * @apiSuccess {string} avatar_url 发起者用户头像
   * 
   */
  async getIndexUserInfo() {
    const json_res = JSON.parse(JSON.stringify(constant.API_RESULT_MODEL));
    json_res.msg.prompt = '查询成功';
    json_res.obj.user_list = [
      { user_id: 1, user_name: "王泽天", user_intro: "技术大佬，喜欢旅行", avatar_url: "https://source.unsplash.com/"},
      { user_id: 1, user_name: "李星煜", user_intro: "深度二次元玩家，B站守护者", avatar_url: "https://source.unsplash.com/" }
    ];
    return json_res;
  }
}

module.exports = IndexInfoService;
