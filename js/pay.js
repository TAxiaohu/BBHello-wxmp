var goodsId = urlUtil.getQueryString("goodId");
var orderId = urlUtil.getQueryString("orderId");
for (i=0;i<seller.sellers.length;i++) {
    if (goodsId == seller.sellers[i].id) {
        context = seller.sellers[i];
    }
}
if (goodsId !== 4) {
	$("#package-name").html(context.name + " - 泰国体检费用");
} else {
	$("#package-name").html(context.name);
}
// // 填充头部页面
// var tpl =  $("#package-info").html();
// var tplTemplate = Handlebars.compile(tpl);
// var tplHtml = tplTemplate(context);
// $(".order-header .row").html(tplHtml);

orderByIdApi(orderId,function(res){
    if (res.code === '200' && res.data) {
    	var tpl =  $("#order-info").html();
		var tplTemplate = Handlebars.compile(tpl);
		var tplHtml = tplTemplate(res.data);
		$(".form-horizontal").html(tplHtml);
		$("#package-price").html(res.data.goodsEarnestPrice);
    }
});
var code = urlUtil.getQueryString("code");
var data = {};
var signData = {};
data.callbackURI = window.location.href;
if (!code) {
	weChatLogIn(data,function(res){
	    if(res.code === "200" && res.data){
	        window.location.href = res.data;
	    } else if (res.code == "500") {
	        alert(res.message);
	    } else {
	    	alert(res.message);
	    }
	});
} else {
	signData.orderId = orderId;
	signData.authCode = code;
}
var payData = {};
function payWeChat(){
	if (payData.data){
		if (typeof WeixinJSBridge == "undefined"){
		   if( document.addEventListener ){
		       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		   }else if (document.attachEvent){
		       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
		       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		   }
		}else{
		   onBridgeReady(payData);
		}
	} else {
		weChatSignature(signData,function(res){
			if(res.code ==="200" || res.code === "2000" && res.data) {
				console.log(res);
				payData = res;
				if (typeof WeixinJSBridge == "undefined"){
				   if( document.addEventListener ){
				       document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				   }else if (document.attachEvent){
				       document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
				       document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				   }
				}else{
				   onBridgeReady(payData);
				}
			} else if (res.code == "500") {
		        alert(res.message);
		    } else {
		    	alert(res.message);
		    }
		});
	}
}
function onBridgeReady(res){
   WeixinJSBridge.invoke(
       'getBrandWCPayRequest', {
           "appId": res.data.appId,     //公众号名称，由商户传入     
           "timeStamp":res.data.timeStamp,         //时间戳，自1970年以来的秒数     
           "nonceStr": res.data.nonceStr, //随机串     
           "package": res.data.packageValue,
           "signType": res.data.signType,         //微信签名方式：     
           "paySign": res.data.paySign //微信签名 
       },
       function(res){     
           if(res.err_msg == "get_brand_wcpay_request:ok") {
           		console.log("ok");
           		weChatPayQuery(orderId,function(res){
					if(res.code ==="200") {
						console.log(res);
						window.location.href = "my.html";
					} else if (res.code == "2004") {
				        alert(res.message);
				    } else {
				    	alert(res.message);
				    }
				});
           } else if (res.err_msg == "get_brand_wcpay_request:cancel") {
           		console.log("cancel");
           } else if (res.err_msg == "get_brand_wcpay_request:fail") {
           		console.log("fail");
           }   // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
       }
   ); 
}