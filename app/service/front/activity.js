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
   * @apiSuccess {datetime} start_time 开始时间
   * @apiSuccess {datetime} end_time 结束时间
   * @apiSuccess {string} join_user_num 参加人数
   * @apiSuccess {string} user_attention_num 关注人数
   * @apiSuccess {string} images_path 图片路径
   */
  async getActivityList(params) {
    let result_obj = {};
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
      attributes: ['activity_id', 'activity_title', 'activity_intro', [sequelize.fn("DATE_FORMAT", sequelize.col('start_time'), '%Y-%m-%d %H:%i') ,'start_time'], [sequelize.fn("DATE_FORMAT", sequelize.col('end_time'), '%Y-%m-%d %H:%i') ,'end_time'], 'join_user_num', 'user_attention_num', 'images_path'],
      order: [['add_time', 'DESC']]
    };
    if(page_size !== 0) {
      sql_option.limit = page_size;
      sql_option.offset = (page_index - 1) * page_size;
    }
    var activity_list_sequelize = await ctx.model.ViActivityInfo.findAndCountAll(sql_option);
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
    let result_obj = {};
    let send_json = {};
    const { ctx } = this;
    const { activity_id } = params;
    const search_activity_obj = {
      activity_id: activity_id,
      delete_status: 0
    };
    const sql_asctivity_option = {
      where: search_activity_obj,
      attributes: ['activity_id', 'activity_title', 'activity_intro', [sequelize.fn("DATE_FORMAT", sequelize.col('start_time'), '%Y-%m-%d %H:%i') ,'start_time'], [sequelize.fn("DATE_FORMAT", sequelize.col('end_time'), '%Y-%m-%d %H:%i') ,'end_time'], 'user_id', 'real_name', 'user_name', 'user_intro', 'avatar_url', 'experience']
    };
    const search_step_obj = {
      activity_id: activity_id,
      delete_status: 0
    };
    const sql_step_option = {
      where: search_step_obj,
      attributes: ['step_name', [sequelize.fn("DATE_FORMAT", sequelize.col('start_time'), '%Y-%m-%d %H:%i') ,'start_time'], [sequelize.fn("DATE_FORMAT", sequelize.col('end_time'), '%Y-%m-%d %H:%i') ,'end_time'], 'step_detail', 'step_address'],
      order: [['step_order']]
    };
    const search_activity_detail = ctx.model.ViActivityInfo.findOne(sql_asctivity_option);
    const search_step_list = ctx.model.JhwActivityStep.findAll(sql_step_option);
    const promise_result = await Promise.all([search_activity_detail, search_step_list]);

    if(!search_activity_detail) {
      send_json = ctx.helper.getApiResult(-1, "无此活动");
      return send_json;
    }
    result_obj = {
      activity_id: promise_result[0].activity_id,
      activity_title: promise_result[0].activity_title,
      activity_intro: promise_result[0].activity_intro,
      start_time: promise_result[0].start_time,
      end_time: promise_result[0].end_time,
      user_id: promise_result[0].user_id,
      real_name: promise_result[0].real_name,
      user_name: promise_result[0].user_name,
      user_intro: promise_result[0].user_intro,
      avatar_url: promise_result[0].avatar_url,
      experience: promise_result[0].experience,
      activity_step_list: promise_result[1]
    };
    send_json = ctx.helper.getApiResult(0, "查询成功", result_obj);
    return send_json;
    
  }

  /**
   * @api {post} /front/api/activity/getActivityComment getActivityComment——获取活动评论
   * @apiName getActivityComment
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} activity_id 活动id
   * @apiParam {int} page_index = 1 页码(*)
   * @apiParam {int} page_size = 0 一页记录数(*)，传0表示显示全部
   * 
   * @apiSuccess {int} total 总记录数 
   * @apiSuccess {list} comment_list 活动评论列表
   * @apiSuccess {string} comment_content 评论内容
   * @apiSuccess {string} comment_time 评论时间
   * @apiSuccess {string} user_name 评论者用户名
   * @apiSuccess {string} avatar_url 发起者用户头像
   * @apiSuccess {int} experience 发起者用户等级
   */
  async getActivityComment(params) {
    let result_obj = {};
    let send_json = {};
    const { ctx } = this;
    const { activity_id, page_size, page_index } = params;
    const search_obj = {
      activity_id: activity_id,
      delete_status: 0
    };
    const sql_option = {
      where: search_obj,
      attributes: ['comment_content', [sequelize.fn("DATE_FORMAT", sequelize.col('comment_time'), '%Y-%m-%d %T') ,'comment_time'], 'user_name', 'avatar_url', 'experience'],
      order: [['comment_time', 'DESC']]
    };
    if(page_size !== 0) {
      sql_option.limit = page_size;
      sql_option.offset = (page_index - 1) * page_size;
    }
    const comment_search_list = await ctx.model.ViCommentInfo.findAndCountAll(sql_option);
    
    result_obj = {
      total: comment_search_list.count,
      comment_list: comment_search_list.rows
    };
    send_json = ctx.helper.getApiResult(0, '查询成功', result_obj);
    return send_json;
  }

  /**
   * @api {post} /front/api/activity/postComment postComment——发表评论
   * @apiName postComment
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * @apiParam {string} activity_id 活动id
   * @apiParam {string} comment_content 评论内容（应设置字数上限未定）
   */
  async postComment(params) {
    let send_json = {};
    const { ctx } = this;
    const { user_id, activity_id, comment_content } = params;
    const post_obj ={
      comment_content: comment_content,
      comment_time: new Date(),
      user_id: user_id,
      activity_id: activity_id
    };
    const insert_result = await ctx.model.JhwActivityComment.create(post_obj);
    if(!insert_result) {
      send_json = ctx.helper.getApiResult(-1, "服务器内部错误");
      return send_json;
    }
    send_json = ctx.helper.getApiResult(0, "评论成功");
    return send_json;
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
   * @apiParam {string} start_time 活动开始时间
   * @apiParam {string} end_time 活动结束时间
   * @apiParam {string} meeting_place 集合地点
   * @apiParam {string} province_code 省份code
   * @apiParam {string} city_code 城市code
   * @apiParam {string} area_code 区域code   
   * @apiParam {int} activity_type_id 活动类型
   * @apiParam {array} img_path_array 活动图片路由数组
   * 
   * @apiSuccess {string} activity_id 活动id
   */
  async postActivityBaseInfo(params) {
    let result_obj = {};
    let send_json = {};
    const { ctx } = this;
    const { user_id, activity_id = "", activity_title, activity_intro, limit_num, cost_type, cost_num, start_time, end_time, meeting_place, province_code, city_code, area_code, activity_type_id, img_path_array } = params;
    const post_obj = {
      activity_title: activity_title,
      activity_intro: activity_intro,
      limit_num: limit_num,
      user_id: user_id,
      cost_type: cost_type,
      delete_status: 0,
      start_time: start_time,
      end_time: end_time,
      meeting_place: meeting_place,
      province_code: province_code,
      city_code: city_code,
      area_code: area_code,
      cost_num: cost_num,
      activity_type_id: activity_type_id,
      activity_status: 1
    };
    if(activity_id) {
      post_obj.activity_id = activity_id;
    } else {
      post_obj.activity_id = ctx.helper.getUUID();
    }
    const t = await ctx.model.transaction();
    try {
      const post_result = await ctx.model.JhwActivity.upsert(post_obj, {
        transaction: t
      });
      const img_create_array = [];
      for(let i = 0; i < img_path_array.length; i++) {
        const create_obj = {
          images_path: img_path_array[i],
          is_first: 0,
          bind_id: post_obj.activity_id,
          bind_type: 2,
          delete_status: 0,
          add_time: new Date(),
          update_time: new Date(),
          order_by: 0,
          images_url: ""
        };
        img_create_array.push(create_obj);
      }
      img_create_array[0].is_first = 1;
      const update_img_result = await ctx.model.JhwImages.update({
        delete_status: 1
      }, {
        where: { bind_id: post_obj.activity_id },
        transaction: t
      });
      const post_img_result = await ctx.model.JhwImages.bulkCreate(img_create_array, {
        transaction: t
      });
      await t.commit();
    } catch(error) {
      console.log(error);
      await t.rollback();
      send_json = ctx.helper.getApiResult(-500, "服务器内部错误");
      return send_json;
    }
    result_obj = {
      activity_id: post_obj.activity_id
    };
    send_json = ctx.helper.getApiResult(0, "填写成功", result_obj);
    return send_json;
  }



  /**
   * @api {post} /front/api/activity/postActivityStep postActivityStep——填写活动步骤
   * @apiName postActivityStep
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
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
  async postActivityStep(params) {
    let result_obj = {};
    let send_obj = {};
    const { ctx } = this;
    const { step_id = "", step_order, start_time, end_time, step_name, step_detail, step_address, activity_id } = params;
    const post_obj = {
      step_order: step_order,
      step_name: step_name,
      start_time: start_time,
      end_time: end_time,
      delete_status: 0,
      step_detail: step_detail,
      step_address: step_address,
      activity_id: activity_id
    };
    if(step_id) {
      post_obj.step_id = step_id;
    }
    const post_result = await ctx.model.JhwActivityStep.upsert(post_obj);

    send_obj = ctx.helper.getApiResult(0, "填写成功");
    return send_obj;
  }

  /**
   * @api {post} /front/api/activity/joinActivity joinActivity——参加活动
   * @apiName joinActivity
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} activity_id 活动id
   * @apiParam {string} user_id 用户id
   * 
   */
  async joinActivity(params) {
    let result_obj = {};
    let send_obj = {};
    const { ctx } = this;
    const { activity_id, user_id } = params;
    const searchObj = {
      activity_id: activity_id,
      user_id: user_id,
      delete_status: 0
    };
    const searchRepeat = await ctx.model.JhwActivityParticipant.count({
      where: searchObj
    });
    if(searchRepeat) {
      //已经参加过活动了不可重复参加
      send_obj = ctx.helper.getApiResult(-1, "您已经成功报名了该活动，请不要重复报名");
      return send_obj;
    }
    const createObj = {
      activity_id: activity_id,
      user_id: user_id,
      delete_status: 0
    };
    const createResult = await ctx.model.JhwActivityParticipant.create(createObj);
    if(!createResult) {
      send_obj = ctx.helper.getApiResult(-1, "参加活动失败，服务器内部错误");
      return send_obj;
    }
    send_obj = ctx.helper.getApiResult(0, "操作成功");
    return send_obj;
  }

  /**
   * @api {post} /front/api/activity/followActivity followActivity——关注活动
   * @apiName followActivity
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} activity_id 活动id
   * @apiParam {string} user_id 用户id
   */
  async followActivity(params) {
    let result_obj = {};
    let send_obj = {};
    const { ctx } = this;
    const { activity_id, user_id } = params;
    const searchObj = {
      activity_id: activity_id,
      user_id: user_id,
      delete_status: 0
    };
    const repeatNum = await ctx.model.JhwActivityAttention.count({
      where: searchObj
    });
    if(repeatNum) {
      send_obj = ctx.helper.getApiResult(0, "您已经关注过该活动，请勿重复关注");
      return send_obj;
    }
    const createObj = {
      activity_id: activity_id,
      user_id: user_id,
      delete_status: 0
    };
    const searchResult = await ctx.model.JhwActivityAttention.create(createObj);
    if(!searchResult) {
      send_obj = ctx.helper.getApiResult(-1, "关注活动失败，服务器内部错误");
      return send_obj;
    }
    send_obj = ctx.helper.getApiResult(0, "操作成功");
    return send_obj;
  }

  /**
   * @api {post} /front/api/activity/cancelFollowActivity cancelFollowActivity——取消关注活动
   * @apiName cancelFollowActivity
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} activity_id 活动id
   * @apiParam {string} user_id 用户id
   */
  async cancelFollowActivity(params) {
    let result_obj = {};
    let send_obj = {};
    const { ctx } = this;
    const { activity_id, user_id } = params;
    const search_obj = {
      activity_id: activity_id,
      user_id: user_id
    };
    const update_obj = {
      delete_status: 1
    };
    const update_result = await ctx.model.JhwActivityAttention.update(update_obj, {
      where: search_obj
    });
    if(!update_result) {
      send_obj = ctx.helper.getApiResult(-1, "取消关注活动失败，服务器内部错误");
      return (send_obj);
    }
    send_obj = ctx.helper.getApiResult(0, "操作成功");
    return send_obj;
  }

  /**
   * @api {post} /front/api/activity/cancelJoinActivity cancelJoinActivity——取消参加活动
   * @apiName cancelJoinActivity
   * @apiGroup Activity
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} activity_id 活动id
   * @apiParam {string} user_id 用户id
   */
  async cancelJoinActivity(params) {
    let result_obj = {};
    let send_obj = {};
    const { ctx } = this;
    const { activity_id, user_id } = params;
    const search_obj = {
      activity_id: activity_id,
      user_id: user_id
    };
    const update_obj = {
      delete_status: 1
    };
    const update_result = await ctx.model.JhwActivityParticipant.update(update_obj, {
      where: search_obj
    });
    if(!update_result) {
      send_obj = ctx.helper.getApiResult(-1, "取消参加活动失败，服务器内部错误");
      return (send_obj);
    }
    send_obj = ctx.helper.getApiResult(0, "操作成功");
    return send_obj;
  }
}

module.exports = ActivityService;
