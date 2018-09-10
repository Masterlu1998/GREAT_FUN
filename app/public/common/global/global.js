/**
 * Created by grovekingli on 2018/9/7.
 */
var userData={};
userData.isLogin = sessionStorage.getItem('GF_IS_LOGIN') || false;
userData.userInfo = JSON.parse(sessionStorage.getItem('GF_USER_INFO')) || {};