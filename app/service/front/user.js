'use strict';

const Service = require('egg').Service;

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
