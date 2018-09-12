/**
 * Created by grovekingli on 2018/9/7.
 */

// 用户空间Vue公共方法
Vue.prototype.getFriendTypeList = function (obj) {
    var that=this;
    var url=API_SERVER_URL.GREAT_FUN + '/user/getFriendTypeList';
    var args={
        "args": {
            "user_id": userData.userInfo.user_id
        }
    };
    var callback=function (res,callbackObj) {
        callbackObj.friendTypeList=res.obj.friend_type_list;
        that.initFriendList(that);
    };

    axios.post(url,args)
        .then(function (response) {
            var res = response.data;
            if(res.retcode===0){
                callback(res,obj);
            }else{
                console.log(res.message.prompt);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};

Vue.prototype.getFriendList = function (obj,friendTypeId,callback) {
    var that=this;
    var url=API_SERVER_URL.GREAT_FUN + '/user/getFriendListByType';
    var args={
        "args": {
            "friend_type_id": friendTypeId
        }
    };
    // var callback=function (res,callbackObj) {
    //     callbackObj.friendListTemp=res.obj.friend_list;
    // };

    axios.post(url,args)
        .then(function (response) {
            var res = response.data;
            if(res.retcode===0){
                callback(res,obj);
            }else{
                console.log(res.message.prompt);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};

Vue.prototype.getUserViewHistory=function (obj,pageSize,pageIndex) {
    if(!pageSize){
        var pageSize=0;
    }
    if(!pageIndex){
        var pageIndex=1;
    }

    var that=this;
    var url=API_SERVER_URL.GREAT_FUN + '/user/getUserViewHistory';
    var args={
        "args": {
            "user_id": userData.userInfo.user_id,
            "page_index":pageIndex,
            "page_size":pageSize
        }
    };
    var callback=function (res,callbackObj) {
        callbackObj.viewHistoryList=res.obj.view_history;
    };

    axios.post(url,args)
        .then(function (response) {
            var res = response.data;
            if(res.retcode===0){
                callback(res,obj);
            }else{
                console.log(res.message.prompt);
            }
        })
        .catch(function (error) {
            console.error(error);
        });
};

Vue.prototype.getAttentionUserList=function (obj,pageSize,pageIndex) {
    if(!pageSize){
        var pageSize=0;
    }
    if(!pageIndex){
        var pageIndex=1;
    }


    var that=this;
    var url=API_SERVER_URL.GREAT_FUN + '/user/getAttentionUserList';
    var args={
        "args": {
            "user_id": userData.userInfo.user_id,
            "page_index":pageIndex,
            "page_size":pageSize
        }
    };
    var callback=function (res,callbackObj) {
        callbackObj.AttentionUserList=res.obj.attention_user_list;
    };

    axios.post(url,args)
        .then(function (response) {
            var res = response.data;
            if(res.retcode===0){
                callback(res,obj);
            }else{
                console.log(res.message.prompt);
            }
        })
        .catch(function (error) {
            console.error(error);
        });

};

Vue.prototype.getUserActivityList=function (obj,pageSize,pageIndex) {
    if(!pageSize){
        var pageSize=0;
    }
    if(!pageIndex){
        var pageIndex=1;
    }


    var that=this;
    var url=API_SERVER_URL.GREAT_FUN + '/user/getUserActivityList';
    var args={
        "args": {
            "user_id": userData.userInfo.user_id,
            "page_index":pageIndex,
            "page_size":pageSize
        }
    };
    var callback=function (res,callbackObj) {
        callbackObj.UserActivityList=res.obj.user_activity_list;
    };

    axios.post(url,args)
        .then(function (response) {
            var res = response.data;
            if(res.retcode===0){
                callback(res,obj);
            }else{
                console.log(res.message.prompt);
            }
        })
        .catch(function (error) {
            console.error(error);
        });

};

Vue.prototype.initFriendList=function (obj) {
    var that=this;
    obj.friendTypeList.forEach(function (item) {
        that.getFriendList(that,item.friend_type_id,function (res,callbackObj) {
            item.friendList=res.obj.friend_list;
        });
    });
};

Vue.prototype.handlefFriendListChange=function (activeNames) {
    console.log(activeNames);
};


//公共过滤器
Vue.filter('sexFilter',function (val) {
    if(val===1){
        return '男';
    }else if(val===2){
        return '女';
    }else {
        return 'ladyBoy';
    }
});