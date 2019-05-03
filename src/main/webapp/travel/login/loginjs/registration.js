//注册
var registration = {
    init:function () {
      var me = this;
      me.registrationShow();
      me.clickShow();
    },
    registrationShow:function () {

    },
    clickShow:function () {
        $("#ready").bind("click",function () {
            var params = {};
            var account = $("#account").val();
            var password = $("#password").val();
            var re_password = $("#re_password").val();
            var user_name = $("#user_name").val();
            var phone = $("#phone").val();
            var address = $("#address").val();
            if(password != re_password){
                alert("两次输入的密码不一致");
                return false;
            }
            params.account = account;
            params.password = password;
            params.user_name = user_name;
            params.mobile_phone = phone;
            params.address = address;
            params.birthday = "2019-1-1";
            Invoker.invokeRequest("loginController/userReistertion",params,function login(data){
                if(data.result.res_code == "0004"){
                    alert("注册失败，账号已被占用");
                    return false;
                }else {
                    alert("注册成功,去登陆吧");
                    window.location.href="../login/login.html";
                }
            });

        });
        $("#goLogin").bind("click",function () {
            window.location.href="../login/login.html";
        });
    }

};
$(function () {
    registration.init();
    }
);