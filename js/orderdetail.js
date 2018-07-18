var id = urlUtil.getQueryString("itemId");
var goodId;
var journeyData = {};
// 获取订单信息
orderByIdApi(id,function(res){
    if (res.code === '200' && res.data) {
    	var tpl = $("#order-detail").html();
		var tplTemplate = Handlebars.compile(tpl);
		var tplHtml = tplTemplate(res.data);
		$(".context").html(tplHtml);
		// 获取套餐名称
		var packageId = res.data.goodsId;
		for (i=0;i<seller.sellers.length;i++) {
		    if (packageId == seller.sellers[i].id) {
		        $("#good-name").html(seller.sellers[i].name);
		        journeyApi(id,function(res){
	                if (res.code === '200' && res.data) {
	                    journeyData.data = res.data.reverse();
	                    for (i=journeyData.data.length;i<orderJourneyArray.length;i++){
	                        journeyData.data.push(orderJourneyArray[i]);
	                    }
	                    var tpl = $("#steps").html();
						var tplTemplate = Handlebars.compile(tpl);
						var tplHtml = tplTemplate(journeyData);
						$(".right ul").html(tplHtml);
	                    $("li[status=2]").addClass("color-pink");
	                    $("li[status=0]").addClass("ongoing");
	                    $("li[status=1]").addClass("ongoing");
	                    // 支付按钮设置
	                    if (journeyData.data[0].stepStatus == 2 && journeyData.data[1].stepStatus !== 2) {
        					$("footer").html("<a href='pay.html?orderId=" + id + "&goodId=" + packageId + "' class='btn btn-primary' role='button'>支付费用</a>");
	            //         } else if (journeyData.data[10].stepStatus == 2 && journeyData.data[11].stepStatus !== 2) {
	            //         // 评论设置
        					// $("footer").html("<a href='review.html?orderId=" + id + "&goodId=" + packageId + "' class='btn btn-primary' role='button'>评论</a>");
	                    } else {
	                    	$("footer").hide();
	                    	$(".right").css("margin-bottom","15px");
	                    }
                    }
                });
		    }
		}
    }
});