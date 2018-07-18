var data = {};
$("#login").click(function(){
    if (mobileNumTest($("#tel").val())) {
        if ($("#psw").val()) {
            data.cellphone = $("#tel").val();
            data.password = $("#psw").val();
            loginApi(data,function(res){
                if (res.code === '200' && res.data) {
                    if (urlUtil.getQueryString("link")){
                        goForPage();
                    } else {
                        window.location.href="my.html";
                    }
                } else if (res.code === "401") {
                    $(".input-tel").html("用户名或密码错误");
                    $(".input-tel").css("visibility","visible");
                } else {
                    $(".input-tel").html("出错了～");
                }
            });
        } else {
            $(".input-password").css("visibility","visible");
        }
    } else {
        $(".input-tel").css("visibility","visible");
    }
});
function goLink(){
    if (link){
        $("#go-register").attr("href",$("#go-register").attr("href") + "?" + moreUrl);
        $("#go-forgetpsw").attr("href",$("#go-forgetpsw").attr("href") + "?" + moreUrl);
    }
}
goLink();
var moreUrl = String(window.location.href).split("?").slice(1,2);
var link = urlUtil.getQueryString("link");
var wcCode = urlUtil.getQueryString("code");
var wcState = urlUtil.getQueryString("state");
if(wcCode){
    weChatOpenId(wcCode,function(res){
        if (res.code === '200' && res.data) {
            console.log(res);
            var token = res.data.token;
            if (token){
                window.location.href = link + ".html?"+moreUrl;
            } else {
                var accessToken = res.data.accessToken;
                var openId = res.data.openId;
                data.openId = openId;
            }
            if (link){
                if (accessToken){
                    $("#go-register").attr("href",$("#go-register").attr("href") + "?accessToken=" + accessToken + "&openId=" + openId);
                } else {
                    $("#go-register").hide();
                }
            }
        }
    });
}