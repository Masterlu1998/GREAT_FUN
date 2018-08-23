'use strict';

const Service = require('egg').Service;
const constant = require('../../public/common/constant');
const moment = require('moment');
const underscore=require('underscore');
const sequelize=require('sequelize');

class UserService extends Service {

  /**
   * @api {post} /front/api/user/getUserDetail getUserDetail——获取用户信息
   * @apiName getUserDetail
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * 
   * @apiSuccess {string} user_name 用户名
   * @apiSuccess {string} sex 性别
   * @apiSuccess {string} address 所在地
   * @apiSuccess {string} telephone 手机号 
   * @apiSuccess {string} email_address 邮箱
   * @apiSuccess {array} label_list 标签名列表
   */

  async getUserDeatail(params){
    let result_obj = {};
    const { ctx } = this;
    const { user_id } = params;
    const search_user_obj = {
      user_id: user_id,
      delete_status: 0
    };
    const sql_user_option = {
      where: search_user_obj,
      attributes: ['user_name', 'sex', 'address', 'telephone', 'email_address']
    };
    const search_lable_obj = {
      bind_id: user_id,
      bind_type: 2
    };
    const sql_lable_option = {
      where: search_lable_obj,
      attributes: ['lable_id', 'lable_name']
    };

    const user_detail_sequelize = await ctx.model.JhwUser.findOne(sql_user_option);
    const label_list_sequelize = await ctx.model.ViLableInfo.findAll(sql_lable_option);
    const promise_result = await Promise.all([user_detail_sequelize, label_list_sequelize]);
    if(user_detail_sequelize.length===0) {
      const send_json = ctx.helper.getApiResult(-1, "用户不存在！");
      return send_json;
    }
  
    result_obj = {
      user_name: promise_result[0].user_name,
      sex: promise_result[0].sex,
      address: promise_result[0].address,
      telephone: promise_result[0].telephone,
      email_address: promise_result[0].email_address,
      label_list: promise_result[1]
    };
    const send_json = ctx.helper.getApiResult(0, "查询成功", result_obj);
    return send_json;
    
  }

  /**
   * @api {post} /front/api/user/getUserViewHistory getUserViewHistory——获取用户浏览信息
   * @apiName getUserViewHistory
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * @apiParam {string} page_size = 0 一页大小(*)
   * @apiParam {string} page_index = 1 页码(*)
   * 
   * @apiSuccess {list} view_history 浏览记录列表
   * @apiSuccess {string} activity_id 活动id
   * @apiSuccess {string} activity_title 活动名称
   * @apiSuccess {datetime} start_time 开始时间
   * @apiSuccess {datetime} end_time 结束时间
   * @apiSuccess {string} meeting_place 集合地点
   */

  async getUserViewHistory(params){
    let result_obj = {};
    const { ctx } = this;
    const { user_id , page_index = 1, page_size = 0  } = params;
    const search_activity_id_obj = {
      user_id: user_id,
      delete_status: 0
    };
    const sql_id_option = {
      where: search_activity_id_obj,
      attributes: ['activity_id'],
      order: [['add_time', 'DESC']]
    };
    const activity_id_sequelize = await ctx.model.JhwActivityOverview.findAll(sql_id_option);
    if(activity_id_sequelize.length===0){
      const send_json = ctx.helper.getApiResult(-1, "暂无浏览记录");
      return send_json;
    }
    const activity_id_result = underscore.pluck(activity_id_sequelize,"dataValues");
    const activity_id_list = underscore.pluck(activity_id_result,"activity_id");
    const search_activity_obj = {
      activity_id: activity_id_list,
      delete_status: 0
    };
    const sql_activity_option = {
      where: search_activity_obj,
      attributes: ['activity_id','activity_title','start_time','end_time','meeting_place'],
    };
    if(page_size !== 0) {
      sql_activity_option.limit = page_size;
      sql_activity_option.offset = (page_index - 1) * page_size;
    }
    const activity_sequelize = await ctx.model.JhwActivity.findAll(sql_activity_option);
    if(activity_sequelize.length===0){
      const send_json = ctx.helper.getApiResult(-1, "系统内部错误");
      return send_json;
    }
    result_obj = {
      view_history: activity_sequelize
    };
    const send_json = ctx.helper.getApiResult(0, "查询成功", result_obj);
    return send_json;
  }


  /**
   * @api {post} /front/api/user/getAttentionUserList getAttentionUserList——获取用户关注人列表
   * @apiName getAttentionUserList
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * @apiParam {string} page_size = 0 一页大小(*)
   * @apiParam {string} page_index = 1 页码(*)
   * 
   * @apiSuccess {list} attention_user_list 用户关注人列表
   * @apiSuccess {string} user_name 关注人用户名
   * @apiSuccess {string} user_intro 关注人用户简介
   * @apiSuccess {string} avatar_url 关注人用户头像
   * @apiSuccess {int} experience 关注人用户等级
   */



  /**
   * @api {post} /front/api/user/getUserActivityList getUserActivityList——获取用户活动
   * @apiName getUserActivityList
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * @apiParam {string} page_size = 0 一页大小(*)
   * @apiParam {string} page_index = 1 页码(*)
   * 
   * @apiSuccess {list} user_activity_list 用户活动列表
   * @apiSuccess {string} activity_id 活动id
   * @apiSuccess {string} activity_title 活动名称
   * @apiSuccess {datetime} start_time 开始时间
   * @apiSuccess {datetime} end_time 结束时间
   * @apiSuccess {string} meeting_place 集合地点
   */


  /**
   * @api {post} /front/api/user/getFriendTypeList getFriendTypeList——获得好友分类列表
   * @apiName getFriendTypeList
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * 
   * @apiSuccess {list} friend_type_list 好友类别列表
   * @apiSuccess {string} friend_type_id 好友类别id
   * @apiSuccess {string} friend_type_name 好友类别名称
   */


  /**
   * @api {post} /front/api/user/getFriendListByType getFriendListByType——获得一个类别下的好友列表
   * @apiName getFriendListByType
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} friend_type_id 好友类别id
   * 
   * @apiSuccess {list} friend_list 好友列表
   * @apiSuccess {string} friend_type_id 好友id
   * @apiSuccess {string} user_name 好友用户名
   */



  /**
   * @api {post} /front/api/user/postFriendType postFriendType——编辑或添加一个好友类别
   * @apiName postFriendType
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * @apiParam {string} friend_type_id 好友类别id(* 存在表示编辑，不存在表示新增)
   * 
   * @apiSuccess {list} friend_list 在该类别下的好友(*)
   * @apiSuccess {string} user_id 好友id
   */



  /**
   * @api {post} /front/api/user/deleteFriendType deleteFriendType——删除一个好友类别
   * @apiName deleteFriendType
   * @apiGroup User
   * @apiVersion 0.1.0
   * 
   * @apiParam {string} user_id 用户id
   * @apiParam {string} friend_type_id 好友类别id
   */

}

module.exports = UserService;
