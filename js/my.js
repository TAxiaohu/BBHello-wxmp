// 获取个人订单
var journeyData = {};
journeyData.data = {};
var jDealedData = {};
var count = 0;
var data = {};
// var code = urlUtil.getQueryString("code");
data.callbackURI = urlConfig + "/wxweb/view/login.html?link=my";
weChatMyOrder(function(res){
    if (res.code === '200' && res.data) {
        var pageOrder = $("#pageOrder").html();
        var template = Handlebars.compile(pageOrder);
        var html = template(res.data);
        $("#order-desc").html(html);
        btnSetting(res.data.jour.stepId,res.data.saleOrder.saleOrderId,res.data.saleOrder.goodsId);
    } else if (res.code == "401") {
        weChatLogIn(data,function(res){
            if(res.code === "200" && res.data){
                window.location.href = res.data;
            } else if (res.code == "500") {
                alert(res.message);
            }
        });
    } else {
        $("#order-desc").html("您还没有订单");
    }
});