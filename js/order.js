var id = urlUtil.getQueryString("id");
for (i=0;i<seller.sellers.length;i++) {
    if (id == seller.sellers[i].id) {
        context = seller.sellers[i];
    }
}
function addOpts(){
    $("#year").append("<option value='0'>出生年份</option>");
    $("#month").append("<option value='0'>出生月份</option>");
    for (i=1956;i<2000;i++){
        $("#year").append("<option value='"+i+"'>"+i+"</option>");
    }
    for (i=1;i<13;i++){
        if(i<10){
            $("#month").append("<option value='0"+i+"'>"+i+"月</option>");
        } else {
            $("#month").append("<option value='"+i+"'>"+i+"月</option>");
        }
    }
}
addOpts();
// 填充头部页面
var tpl =  $("#package-info").html();
var tplTemplate = Handlebars.compile(tpl);
var tplHtml = tplTemplate(context);
$(".order-header .row").html(tplHtml);
// 时间控件初始化
// $('.form_date').datetimepicker({
//     language:  'zh-CN',
//     weekStart: 1,
//     todayBtn:  1,
//     autoclose: 1,
//     todayHighlight: 1,
//     startView: 2,
//     minView: 2,
//     forceParse: 0
// });
// 地址初始化
$("#address").citySelect({
    prov:"北京",
    nodata:"none",
});
// 预约判断
var orderData = {};
$("#order-next").click(function() {
    if (accountInfo.cellphone){
        if ($("#name").val()) {
            if ($('input:radio[name="sex"]:checked').val()) {
                // if ($("#age input").val()<="2000-01-01" && $("#age input").val()>="1956-01-01") {
                if ($("#year").val() && $("#month").val()) {
                    if (mobileNumTest($("#tel").val())) {
                        if ($("#province").val()) {
                            if ($("#city").val()) {
                                // 创建预约单
                                orderData.goodsId = parseInt(id);
                                orderData.goodsPrice = context.price;
                                orderData.goodsQuantity = 1;
                                orderData.name = $("#name").val();
                                // orderData.birthday = $("#age").val();
                                orderData.birthday = $("#year").val() + $("#month").val();
                                orderData.gender = parseInt($('input:radio[name="sex"]:checked').val());
                                orderData.fullAddress = $("#province").val()+$("#city").val();
                                orderData.cellphone = $("#tel").val();
                                // 支付环境
                                orderData.payEnvironment = "wx_js";
                                postOrderApi(orderData,function(res){
                                    if (res.code === '200' && res.data) {
                                        $("#success").trigger("click");
                                    } else {
                                        $(".success").html("预约出错");
                                        $(".success").css("visibility","visible");
                                    }
                                });
                            } else {
                                $(".input-address").css("visibility","visible");
                            }
                        } else {
                            $(".input-address").css("visibility","visible");
                        }
                    } else {
                        $(".input-tel").css("visibility","visible");
                    }
                } else {
                    $(".input-age").css("visibility","visible");
                }
            } else {
                $(".input-sex").css("visibility","visible");
            }
        } else {
            $(".input-name").css("visibility","visible");
        }
    } else {
        $(".success").html("请先登录");
        $(".success").css("visibility","visible");
    }
});
