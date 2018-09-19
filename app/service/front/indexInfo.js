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
    let result_obj = {};
    let send_json = {};
    const { ctx } = this;
    const search_obj = {
      delete_status: 0,
      bind_type: 1,
    };
    const sql_option = {
      where: search_obj,
      order: [['order_by']],
      attributes: ['images_path', 'images_url']
    };
    const img_list = await ctx.model.JhwImages.findAll(sql_option);
    result_obj = {
      banner_list: img_list
    };
    send_json = ctx.helper.getApiResult(0, "查询成功", result_obj);
    return send_json;
  }

  /**
   * @api {post} /front/api/indexInfo/getIndexActivityInfo getIndexActivityInfo——获取首页活动信息
   * @apiName getIndexActivityInfo
   * @apiGroup IndexInfo
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * 
   * @apiSuccess {list} activity_list 首页活动列表 
   * @apiSuccess {string} activity_id 活动id 
   * @apiSuccess {string} activity_title 活动标题
   * @apiSuccess {string} activity_intro 活动简介
   * @apiSuccess {datetime} start_time 活动开始时间
   * @apiSuccess {datetime} end_time 活动结束时间
   */
  async getIndexActivityInfo(params) {
    let result_obj = {};
    let send_json = {};
    const { ctx } = this;
    const { user_id } = params;
    const user_label_search_obj = {
      bind_id: user_id,
    };
    const user_label_sql_option = {
      where: user_label_search_obj,
      attributes: ['label_id']
    };
    const user_label_list_result = await ctx.model.ViLabelInfo.findAll(user_label_sql_option);
    const user_label_list = underscore.pluck(user_label_list_result, 'label_id');
    const activity_label_search_obj = {
      label_id: user_label_list,
    };
    const activity_label_sql_option = {
      where: activity_label_search_obj,
      attributes: ['bind_id'],
    };
    const match_activity_id_list_result = await ctx.model.ViLabelInfo.findAll(activity_label_sql_option);
    const match_activity_id_list = underscore.pluck(match_activity_id_list_result, 'bind_id');
    const activity_search_obj = {
      activity_id: match_activity_id_list,
      activity_status: 1,
    };
    const activity_sql_option = {
      where: activity_search_obj,
      attributes: ['activity_id', 'activity_title', 'activity_intro', [sequelize.fn("DATE_FORMAT", sequelize.col('start_time'), '%Y-%m-%d %T') ,'start_time'], [sequelize.fn("DATE_FORMAT", sequelize.col('end_time'), '%Y-%m-%d %T') ,'end_time'], 'images_path'],
      limit: 5
    };
    const activity_list = await ctx.model.ViActivityInfo.findAll(activity_sql_option);
    result_obj = {
      activity_list: activity_list
    };
    send_json = ctx.helper.getApiResult(0, '查询成功', result_obj);
    return send_json;
  }

  /**
   * @api {post} /front/api/indexInfo/getIndexUserInfo getIndexUserInfo——获取首页知名博主信息
   * @apiName getIndexUserInfo
   * @apiGroup IndexInfo
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id   
   * 
   * @apiSuccess {list} user_list 首页知名博主列表 
   * @apiSuccess {string} user_id 博主id 
   * @apiSuccess {string} user_name 博主用户名
   * @apiSuccess {string} user_intro 博主简介
   * @apiSuccess {string} avatar_url 发起者用户头像
   * 
   */
  async getIndexUserInfo(params) {
    let result_obj = {};
    let send_json = {};
    const { ctx } = this;
    const { user_id } = params;
    const user_label_search_obj = {
      bind_id: user_id,
      bind_type: 2
    };
    const user_label_sql_option = {
      where: user_label_search_obj,
      attributes: ['label_id']
    };
    const user_label_list_result = await ctx.model.ViLabelInfo.findAll(user_label_sql_option);
    const user_label_list = underscore.pluck(user_label_list_result, 'label_id');
    const famous_label_search_obj = {
      label_id: user_label_list,
      bind_id: { $ne: user_id },
      bind_type: 2,
    };
    const famous_label_sql_option = {
      where: famous_label_search_obj,
      attributes: ['bind_id'],
    };
    const match_famous_id_list_result = await ctx.model.ViLabelInfo.findAll(famous_label_sql_option);
    const match_famous_id_list = underscore.pluck(match_famous_id_list_result, 'bind_id');
    const famous_search_obj = {
      user_id: match_famous_id_list,
      delete_status: 0,
    };
    const famous_sql_option = {
      where: famous_search_obj,
      attributes: ['user_id', 'user_name', 'user_intro', 'avatar_url'],
      limit: 5
    };
    const famous_list = await ctx.model.JhwUser.findAll(famous_sql_option);
    result_obj = {
      user_list: famous_list
    };
    send_json = ctx.helper.getApiResult(0, '查询成功', result_obj);
    return send_json;
  }
}

module.exports = IndexInfoService;
