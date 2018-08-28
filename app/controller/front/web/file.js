'use strict';

const Controller = require('egg').Controller;
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
const path = require('path');
var mkdirp = require('mkdirp');

class FileController extends Controller {
    async upload() {
        console.log("this = " + JSON.stringify(this));
        const root = this.config.appBaseDir;
        const {
            ctx
        } = this;
        const stream = await ctx.getFileStream();
        const relativePath = stream.fields.relativePath; //获取前端上传的路径
        const fileName = new Date().getTime() + '.' + stream.filename.split('.')[1];
        const detailPath = path.join(root, relativePath); //只到文件夹
        //创建文件夹
        mkdirp.sync(detailPath, function (err) {
            if (err) {
                console.error(err);
            } else {
                //不处理
            }
        });
        // 全路径，比如C://XX/1.jpg
        const fullPath = detailPath + fileName;
        let result;
        try {
            result = new Promise((resolve, reject) => {
                const ws = fs.createWriteStream(fullPath);
                stream.pipe(ws);
                ws.on('error', reject);
                ws.on('end', resolve(fullPath));
            });
        } catch (err) {
            // 必须将上传的文件流消费掉，要不然浏览器响应会卡死
            await sendToWormhole(stream);
            throw err;
        }

        ctx.body = {
            // url: relativePath,
            // 所有表单字段都能通过 `stream.fields` 获取到
            serverPath: [relativePath + fileName]
        };
    }
}

module.exports = FileController;