'use strict';
const constant = require('../../public/common/constant');
const moment = require('moment');
const underscore=require('underscore');
const sequelize=require('sequelize');

const Service = require('egg').Service;

class LabelService extends Service {
  /**
   * @api {post} /front/api/label/getLabelList getLabelList——获取标签
   * @apiName getLabelList
   * @apiGroup label
   * @apiVersion 0.1.0
   * 
   * 
   * @apiSuccess {list} label_list 标签列表 
   * @apiSuccess {string} label_id 标签id 
   * @apiSuccess {string} label_name 标签名称
   */
    async getLabelList(params) {
        let result_obj = {};
        let send_json = {};
        const { ctx } = this;
        // const { } = params;
        const search_label_obj = {
            delete_status: 0,
        };
        const label_list = await ctx.model.JhwLabel.findAndCountAll({
            where: search_label_obj,
            attributes: ['label_id', 'label_name']
        });
        result_obj = {
            label_list: label_list
        };
        send_json = ctx.helper.getApiResult(0, '查询成功', result_obj);
        return send_json;
    }

  /**
   * @api {post} /front/api/label/bindLabel bindLabel——绑定标签
   * @apiName bindLabel
   * @apiGroup label
   * @apiVersion 0.1.0
   * 
   * 
   * @apiParam {string} bind_id 绑定id（活动id/用户id）
   * @apiParam {string} label_id 标签id
   * @apiParam {int} bind_type 绑定类型（1：活动；2：用户）
   * 
   */
    async bindLabel(params) {
        let result_obj = {};
        let send_json = {};
        const { ctx } = this;
        const { bind_id, label_array, bind_type } = params;
        const create_label_sql = [];
        for(let i = 0; i < label_array.length; i++) {
            const label_create_obj = {
                bind_id: bind_id,
                label_id: label_array[i],
                bind_type: bind_type,
                delete_status: 0
            };
            create_label_sql.push(label_create_obj);
        }
        const create_result = await ctx.model.JhwLabelBind.bulkCreate(create_label_sql);
        if(!create_result) {
            send_json = ctx.helper.getApiResult(-1, "添加失败");
            return send_json;
        }
        send_json = ctx.helper.getApiResult(0, '添加成功');
        return send_json;
    }
}

module.exports = LabelService;
