// 获取个人订单
var journeyData = {};
journeyData.data = {};
var jDealedData = {};
var count = 0;
orderApi(function(res){
    if (res.code == '200') {
        if (res.data.length == 0) {
            $("#order-desc").html("您还没有订单哦");
            return false;
        }
        for (i=0;i<res.data.items.length;i++) {
            res.data.items[i].orderStatus = stepStatusConf(res.data.items.orderStatus);
        }
        var pageOrder = $("#pageOrder").html();
        var template = Handlebars.compile(pageOrder);
        var html = template(res.data);
        $("#page-myorder").html(html);
        goDetail();
        // 下拉行程状态
        var orderId = [];
        var goodsId = [];
        var obj = $(".order-detail");
        var jnsData = {};
        for (i=0;i<obj.length;i++) {
            orderId[i] = $(obj.get(i)).attr("order-id");
            goodsId.push($(obj.get(i)).attr("good-id"));
            journeyApi(orderId[i],function(res){
                if (res.code === '200' && res.data) {
                    fillHtml(res.data[0]);
                    goDetail();
                }
            });
        }
    } else if (res.code == "401") {
        console.log(1);
        window.location.href="login.html?link=myorder";
    }
});
