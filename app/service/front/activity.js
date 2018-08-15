'use strict';

const Service = require('egg').Service;
const constant = require('../../public/common/constant');
const moment = require('moment');
const underscore=require('underscore');
const sequelize=require('sequelize');

class ActivityService extends Service {
  /**
   * @api {post} /front/api/activity/getActivityList getActivityList——获取活动列表
   * @apiName getActivityList
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} province_code 省份code
   * @apiParam {string} city_code 城市code
   * @apiParam {string} area_code 区域code 
   * @apiParam {datetime} start_time 开始时间
   * @apiParam {datetime} end_time 结束时间
   * @apiParam {int} cost_num_type 活动花费金额[1:100以下, 2:100-1000, 3:1000-5000, 4:5000-30000(暂定)]
   * @apiParam {string} keywords = "" 活动名称关键字(*)
   * @apiParam {int} page_index = 1 当前页码(*)
   * @apiParam {int} page_size = 0 一页记录数目(*)
   * 
   * @apiSuccess {int} total 记录总数
   * @apiSuccess {list} activity_list 活动列表
   * @apiSuccess {string} activity_id 活动id
   * @apiSuccess {string} activity_title 活动标题
   * @apiSuccess {string} activity_intro 活动简介
   */
  async getActivityList(params) {
    let result_obj;
    const { ctx } = this;
    const { province_code , city_code, area_code, start_time, end_time, cost_num_type, keywords = "", page_index = 1, page_size = 0  } = params;
    const search_activity_obj = {
      delete_status: 0
    };
    if(keywords && keywords !== "") {
      search_activity_obj.activity_title = { $like: '%' + keywords + '%' };
    }
    if(province_code) {
      search_activity_obj.province_code = province_code;
    }
    if(city_code) {
      search_activity_obj.city_code = city_code;
    }
    if(area_code) {
      search_activity_obj.area_code = area_code;
    }
    if(start_time) {
      search_activity_obj.start_time = { $gte: start_time };
    }
    if(end_time) {
      search_activity_obj.end_time = { $lte: end_time };
    }
    if(cost_num_type) {
      let condition;
      switch(cost_num_type) {
        case 1:
          condition = { $lte: 100 };
          break;
        case 2: 
          condition = { $gt: 100, $lte: 1000 };
          break;
        case 3:
          condition = { $gt: 1000, $lte: 5000 };
          break;
        case 4:
          condition = { $gt: 5000, $lte: 30000 };
          break;
        case 5:
          condition = { $gt: 30000 };
          break;
        default: condition = {};
      }
      search_activity_obj.cost_num = condition;
    }
    const sql_option = {
      where: search_activity_obj,
      attributes: ['activity_id', 'activity_title', 'activity_intro'],
      order: [['add_time', 'DESC']]
    };
    if(page_size !== 0) {
      sql_option.limit = page_size;
      sql_option.offset = (page_index - 1) * page_size;
    }
    const activity_list_sequelize = await ctx.model.JhwActivity.findAndCountAll(sql_option);
    result_obj = {
      total: activity_list_sequelize.count,
      activity_list: activity_list_sequelize.rows,
    };
    const send_json = ctx.helper.getApiResult(0, "查询成功", result_obj);
    return send_json;
  }

  /**
   * @api {post} /front/api/activity/getActivityDetail getActivityDetail——获取活动详情
   * @apiName getActivityDetail
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} activity_id 活动id
   * 
   * @apiSuccess {string} activity_id 活动id
   * @apiSuccess {string} activity_title 活动标题
   * @apiSuccess {string} activity_intro 活动简介
   * @apiSuccess {datetime} start_time 活动开始时间
   * @apiSuccess {datetime} end_time 活动结束时间 
   * @apiSuccess {string} user_id 发起者id
   * @apiSuccess {string} real_name 发起者真实姓名
   * @apiSuccess {string} user_name 发起者用户名
   * @apiSuccess {string} user_intro 发起者用户简介
   * @apiSuccess {string} avatar_url 发起者用户头像
   * @apiSuccess {int} experience 发起者用户等级
   * @apiSuccess {list} activity_step_list 活动步骤
   * @apiSuccess {string} step_name 步骤名
   * @apiSuccess {datetime} start_time 步骤开始时间
   * @apiSuccess {datetime} end_time 步骤结束时间
   * @apiSuccess {string} step_detail 步骤内容
   * @apiSuccess {string} step_address 步骤详细地址
   */
  async getActivityDetail(params) {
    const json_res = JSON.parse(JSON.stringify(constant.API_RESULT_MODEL));
    json_res.msg.prompt = '查询成功';
    json_res.obj.activity_id = "1111";
    json_res.obj.activity_title = "这是一次活动";
    json_res.obj.activity_intro = "这是一次活动的简介";
    json_res.obj.start_time = "2018-08-22 12:00:00";
    json_res.obj.end_time = "2018-08-24 12:00:00";
    json_res.obj.user_id = "123123";
    json_res.obj.real_name = "鲁冰";
    json_res.obj.user_name = "Robin";
    json_res.obj.user_intro = "这是Robin的用户简介";
    json_res.obj.avatar_url = "https://source.unsplash.com/";
    json_res.obj.experience = 12000;
    json_res.obj.activity_step_list = [
      { step_name: "第一步", start_time: "2018-08-22 12:00:00", end_time: "2018-08-23 12:00:00", step_detail: "这是具体的步骤简介", step_address: "这是步骤的详细地址" },
      { step_name: "第二步", start_time: "2018-08-22 12:00:00", end_time: "2018-08-23 12:00:00", step_detail: "这是具体的步骤简介", step_address: "这是步骤的详细地址" },
      { step_name: "第三步", start_time: "2018-08-22 12:00:00", end_time: "2018-08-23 12:00:00", step_detail: "这是具体的步骤简介", step_address: "这是步骤的详细地址" }
    ];
    return json_res;
  }

  /**
   * @api {post} /front/api/activity/getActivityComment getActivityComment——获取活动评论
   * @apiName getActivityComment
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} activity_id 活动id
   * 
   * @apiSuccess {list} comment_list 活动评论列表
   * @apiSuccess {string} comment_content 评论内容
   * @apiSuccess {string} comment_time 评论时间
   * @apiSuccess {string} user_name 评论者用户名
   * @apiSuccess {string} avatar_url 发起者用户头像
   * @apiSuccess {int} experience 发起者用户等级
   */
  async getActivityComment(params) {
    const json_res = JSON.parse(JSON.stringify(constant.API_RESULT_MODEL));
    json_res.msg.prompt = '查询成功';
    json_res.obj.comment_list = [
      { comment_content: "这是第一条评论", comment_time: "2018-08-22 12:00:00", user_name: "Robin", experience: 12000 },
      { comment_content: "这是第二条评论", comment_time: "2018-08-22 12:20:00", user_name: "Robin", experience: 12000 },
      { comment_content: "这是第三条评论", comment_time: "2018-08-22 12:30:00", user_name: "Robin", experience: 12000 }
    ];
    return json_res;
  }


  /**
   * @api {post} /front/api/activity/postActivityBaseInfo postActivityBaseInfo——填写活动基本信息
   * @apiName postActivityBaseInfo
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * @apiParam {string} activity_id 活动id(*)
   * @apiParam {string} activity_title 活动标题
   * @apiParam {string} activity_intro 活动简介
   * @apiParam {int} limit_num 人数上限
   * @apiParam {int} cost_type 费用形式(1.自费2.AA 3.AAB)
   * @apiParam {int} cost_num 费用金额
   * @apiParam {string} add_time 活动创建时间
   * @apiParam {string} start_time 活动开始时间
   * @apiParam {string} end_time 活动结束时间
   * @apiParam {string} meeting_place 集合地点
   * @apiParam {string} province_code 省份code
   * @apiParam {int} activity_type_id 活动类型
   * 
   * 
   * @apiSuccess {string} activity_id 活动id
   */



  /**
   * @api {post} /front/api/activity/postActivityStep postActivityStep——填写活动步骤
   * @apiName postActivityStep
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * @apiParam {string} step_id 步骤id(*)
   * @apiParam {int} step_order 步骤顺序（用来排序和显示）
   * @apiParam {string} start_time 步骤开始时间
   * @apiParam {string} end_time 步骤结束时间
   * @apiParam {string} step_name 步骤名
   * @apiParam {string} step_detail 具体步骤
   * @apiParam {string} step_address 步骤对应的地址
   * @apiParam {string} activity_id 活动id
   * 
   */
}

module.exports = ActivityService;
