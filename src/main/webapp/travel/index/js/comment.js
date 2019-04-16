var comments = {
    init:function () {
        var me = this;
        me.clickComment();
    },
    clickComment:function () {
        $("#commentSubmit").bind("click",function () {
            var params = {};
            var user_name = $("#user_name").val();
            var phone = $("#phone").val();
            var comment_detail = $("#comment_detail").val();
            params.username = user_name;
            params.phone = phone;
            params.comment_detail = comment_detail;
            Invoker.invokeRequest("commentController/addComment",params,null);
            alert("提交成功，感谢支持！");
            window.location.href="../index/index.html";
        })
    }
};
$(function () {
    comments.init();
    }
);