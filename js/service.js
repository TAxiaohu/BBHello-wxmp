var apiConfig = "http://51ssss.sudaotech.com/platform";
var urlConfig = "http://51ssss.sudaotech.com";
var apiConfigNormal = "http://www.51ssss.cn/platform";
var urlConfigNormal = "http://www.51ssss.cn";

// 套餐列表页面的评论
var reviewApi = function(id,callback) {
	function cb(res) {
// 		try {
// // 封装
// 		}
		callback(res);
	}
	$.ajax({
        url: apiConfig + "/web/comment/list/"+id,
        type: "GET",
        dataType: "json",
        success: cb,
    });

}

// 获取套餐预约数
var sellerAmountApi = function(id,callback) {
	function cb(res) {
// 		try {
// // 封装
// 		}
		callback(res);
	}
	$.ajax({
        url: apiConfig + "/web/order/amount/"+id,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 获取案例列表
var caseApi = function(callback) {
	function cb(res) {
// 		try {
// // 封装
// 		}
		callback(res);
	}
	$.ajax({
        url: apiConfig + "/web/content?type=3",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 获取热门资讯列表
var hotArticleApi = function(callback) {
	function cb(res) {
// 		try {
// // 封装
// 		}
		callback(res);
	}
	$.ajax({
        url: apiConfig + "/web/content",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 获取新闻报道列表
var newsArticleApi = function(callback) {
	function cb(res) {
// 		try {
// // 封装
// 		}
		callback(res);
	}
	$.ajax({
        url: apiConfig + "/web/content?type=1",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 获取技术列表
var techArticleApi = function(callback) {
	function cb(res) {
// 		try {
// // 封装
// 		}
		callback(res);
	}
	$.ajax({
        url: apiConfig + "/web/content?type=2",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 根据type获取文章列表
var articleApi = function(type,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/web/content?type=" + type,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 获取文章详情
var articleDetailApi = function(id,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/web/content/" + id,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 注册
var registerApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 获取个人信息
var profileApi = function(callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/profile",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

function _ajax(option) {
    option.url = option.url + "?_=" + new Date().getTime();
    $.ajax(option);
}


// 登录
var loginApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/auth/login",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 修改密码
var changePswApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/password",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 添加客户
var addClientApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/brokercustomer",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 忘记密码
var forgetPswApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/password/reset",
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 个人获取订单
var orderApi = function(callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/order/saleorder",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 退出
var quitApi = function(callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/auth/logout",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 发送验证码
var sendCodeApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }

        callback(res);
    }
    _ajax({
        url: apiConfig + "/phoneCode/single",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 添加评论
var commentApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/comment",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 预约
var postOrderApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/order",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 行程
var journeyApi = function(orderId,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/web/journey/main/" + orderId,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}


// 查看客户
var myCustomerApi = function(callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    _ajax({
        url: apiConfig + "/web/brokercustomer/mycustomer",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 获取随机文章3个
var randomArticleApi = function(type,id,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/web/content/random?type="+type+"&contentId="+id,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 上传图片传回URL
function uploadImg(idAttr){
    $.ajaxFileUpload({
        url: apiConfig+"/image", //用于文件上传的服务器端请求地址
        secureuri: false, //是否需要安全协议，一般设置为false
        fileElementId: idAttr, //文件上传域的ID
        dataType: 'json', //返回值类型 一般设置为json
        type:'POST',
        success: function (res){
            imgUrl.push(res.data[0]);
            $("#imggrp-"+count).css("background-image","url('"+apiConfig+"/image"+res.data[0]+"')");
            $("#imggrp-"+count + " .img-close").show();
            if (count == 1) {
                delImage();
            }
            count = count+1;
        }
    });
}

// 上传图片
var imageApi = function(data,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/photo",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 根据orderId查询订单
var orderByIdApi = function(id,callback) {
    function cb(res) {
//      try {
// // 封装
//      }
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/web/order/" + id,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// wechat Api
var weChatConfig = function(url,callback){
    function cb(res){
        callback(res);
    }
    $.ajax({
        //?url=http://localhost:8080/platform/jsconfig
        url: apiConfig + "/wxconfig/jsconfig?url=" + url,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// wechat Login
var weChatLogIn = function(data,callback){
    function cb(res){
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/wxconfig/authcodeuri",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// wechat get open ID
var weChatOpenId = function(code,callback){
    function cb(res){
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/wxconfig/getopentid?code=" + code,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}

// 微信获取单个订单
var weChatMyOrder = function(callback){
    function cb(res){
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/web/wx/order/saleorder",
        type: "GET",
        dataType: "json",
        success: cb,
    });
}


// 微信获取签名
var weChatSignature = function(data,callback){
    function cb(res){
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/wxjspay/signature",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: cb,
    });
}

// 微信支付成功后客户端调用查询接口
var weChatPayQuery = function(id,callback){
    function cb(res){
        callback(res);
    }
    $.ajax({
        url: apiConfig + "/wxjspay/paystatus/" + id,
        type: "GET",
        dataType: "json",
        success: cb,
    });
}