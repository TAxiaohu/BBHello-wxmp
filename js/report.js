var count = 1;
var imgData = {};
var imgUrl = [];
var orderId = urlUtil.getQueryString("orderId");
var goodId = urlUtil.getQueryString("goodId");
imgData.orderId = orderId;
imgData.extType = 1;
$("#upl-report").click(function(){
    for (i=0;i<imgUrl.length;i++){
        imgData.uri = imgUrl[i];
        imageApi(imgData,function(res){
            window.location.href="reportsuccess.html?goodId=" + goodId;
        });
    }
});
function uploadPic(){
    uploadImg("upload-input");
}
function fillImage(id){
    $("#upl-report").css("background-color","#ec7688");
    uploadPic();
    // 无限新增img－block；
    var lastImg = $($(".col-xs-2").get($(".col-xs-2").length-1));
    var lastTwoImg = $($(".col-xs-2").get($(".col-xs-2").length-2));
    var num = parseInt(lastImg.attr("id").split("-")[1]) + 1;
    if (lastTwoImg.attr("style")){
        $("#pic-list").append("<div class='pic-block col-xs-2' id='imggrp-" + num + "'></div>");
    }
}
function delImage(){
    $(".img-close").click(function(){
        // 当前url
        var imgUrlStyle = $(this).parent().attr("style").split("image")[2];
        var imgUrlVal = imgUrlStyle.slice(0,imgUrlStyle.length-3);
        // 当前imgblock隐藏
        $(this).parent().hide();
        // 末尾新增imgblock
        var num = parseInt($($(".col-xs-2").get($(".col-xs-2").length-1)).attr("id").split("-")[1]) + 1;
        $(this).parent().parent().append("<div class='pic-block col-xs-2' id='imggrp-" + num + "'><img class='img-close' src='../img/icon-report-close.png' style='display:none'></div>")
        // url数组删掉当前url
        removeFromArray(imgUrl,imgUrlVal);
    });
}