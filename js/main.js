// urlMap
var urlUtil = {
    getQueryString : function(paramName){
        var reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");//构造一个含有目标函数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);//匹配目标函数
        if(r!=null)return  unescape(r[2]); return null;//返回参数值
    }
};

// 页面跳转加id
var goDetail = function(){
	$(".go-detail").click(function() {
	    window.location.href= $(this).attr("f-target") + "?itemId=" + $(this).attr("id");
	});
}

// 给myorder页面添加行程html
function fillHtml(data){
    var pageJourney = $("#pageJourney").html();
    var jtemplate = Handlebars.compile(pageJourney);
    data.stepStatus = stepStatusConf(data.stepStatus);
    var jhtml = jtemplate(data);
    $($(".order-step").get(count)).html(jhtml);
    
    var goodId = $($(".order-detail").get(count)).attr("good-id");
    // 上传报告按钮设置
    // if (data.stepId == 1) {
    //     if (data.stepStatus == 1){
    //         $($(".step-status").get(count)).html("<a href='report.html?orderId=" + data.orderId + "&goodId=" + goodId + "' class='btn btn-primary' role='button'>修改报告</a><span style='color-blue'>(审核中)</span>");
    //     } else {
    //         $($(".step-status").get(count)).html("<a href='report.html?orderId=" + data.orderId + "&goodId=" + goodId + "' class='btn btn-primary' role='button'>上传报告</a>");
    //     }
    // }
    // 支付按钮设置
    if (data.stepId == 1) {
        $($(".step-status").get(count)).html("<a href='pay.html?orderId=" + data.orderId + "&goodId=" + goodId + "' class='btn btn-primary' role='button'>支付费用</a>");
    }
    // 评论设置
    // if (data.stepId == 13){
    //     $($(".step-status").get(count)).html("<a href='build.html' class='btn btn-primary' role='button'>评论</a>");
    // }
    count = count+1;
}
function btnSetting(statusNo,orderId,goodId){
    // 上传报告按钮设置
    // if (statusNo == 1) {
    //     if (data.stepStatus == 1){
    //         $($(".step-status").get(count)).html("<a href='report.html?orderId=" + data.orderId + "&goodId=" + goodId + "' class='btn btn-primary' role='button'>修改报告</a><span style='color-blue'>(审核中)</span>");
    //     } else {
    //         $($(".step-status").get(count)).html("<a href='report.html?orderId=" + data.orderId + "&goodId=" + goodId + "' class='btn btn-primary' role='button'>上传报告</a>");
    //     }
    // }
    // 支付按钮设置
    if (statusNo == 1) {
        $(".step-status").html("<a href='pay.html?orderId=" + orderId + "&goodId=" + goodId + "' class='btn btn-primary' role='button'>支付费用</a>");
    }
    // 评论设置
    // if (data.stepId == 13){
    //     $(".step-status").html("<a href='build.html' class='btn btn-primary' role='button'>评论</a>");
    // }
}
// 发送验证码计时器
function timedCount(){ 
    $("#send-identify-code").html("发送验证码(" +c+ ")");
    c = c-1;
    t = setTimeout("timedCount()",1000);
    if (c==0) {
        clearTimeout(t);
        $("#send-identify-code").html("发送验证码");
        $("#send-identify-code").attr("onclick","sendIdfCode()");
        c=60;
    }
}

// 验证手机号码正则
function mobileNumTest(num) {
	if (!(/^1[3|4|5|7|8][0-9]\d{8}$/.test(num))) {
	    return false;
	}
	return true;
}

// 发送验证码
function sendIdfCode(){
    if (c!==1){
        if (mobileNumTest($("#tel").val())) {
            telData.cellphone = $("#tel").val();
            sendCodeApi(telData,function(){
            	$("#send-identify-code").removeAttr("onclick","sendIdfCode()");
                timedCount();
            });
        } else {
            $(".input-tel").css("visibility","visible");
        }
    }
    else {
        c=60;
        $("#send-identify-code").attr("onclick","sendIdfCode()");
    }
}

// tab
$('.tab-content a').click(function (e) {
	e.preventDefault()
	$(this).tab('show');
});

// 登录获取个人信息
var accountInfo = {};
profileApi(function(res){
    if (res.code === '200' && res.data) {
    	accountInfo = res.data;
    }
});

// 登录页面跳转记忆链接
function goForPage(){
    // var curUrl = window.location.href;
    // var id = String(window.location.href).split("?")?String(window.location.href).split("?").slice(1,2):[];
    var id = urlUtil.getQueryString("itemId")?"?itemId="+urlUtil.getQueryString("itemId"):"";
    var goHref = urlUtil.getQueryString("link");
    window.location.href = goHref + ".html" + id;
}

var removeFromArray = function(arr,val){
    var index = $.inArray(val,arr);
    if (index >= 0)
        arr.splice(index, 1);
    return arr;
};

// // 分享到朋友圈
// function shareWCMoment(data){
//     weChatConfig(data.url,function(res){
//         if(res.code === "200" && res.data){
//             wx.config({
//                 debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//                 appId: res.data.appId, // 必填，公众号的唯一标识
//                 timestamp: res.data.timestamp, // 必填，生成签名的时间戳
//                 nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
//                 signature: res.data.signature,// 必填，签名，见附录1
//                 jsApiList: ['onMenuShareTimeline'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//             });
//         } else {
//             alert(res.message);
//         }
//     });
//     wx.onMenuShareTimeline({
//         title:data.title, // 分享标题
//         link:data.link, // 分享链接
//         imgUrl:data.imgUrl, // 分享图标
//         success: function () {
//             // 用户确认分享后执行的回调函数
//             console.log("success");
//         },
//         cancel: function () { 
//             // 用户取消分享后执行的回调函数
//             console.log("cancel");
//         }
//     });
// }
// // 发送给朋友
// function shareWCFriend(data){
//     wx.onMenuShareAppMessage({
//         title:data.title, // 分享标题
//         desc:data.desc, // 分享描述
//         link:data.link, // 分享链接
//         imgUrl:data.imgUrl, // 分享图标
//         type: '', // 分享类型,music、video或link，不填默认为link
//         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
//         success: function () { 
//             // 用户确认分享后执行的回调函数
//             console.log("success");
//         },
//         cancel: function () { 
//             // 用户取消分享后执行的回调函数
//             console.log("cancel");
//         }
//     });
// }