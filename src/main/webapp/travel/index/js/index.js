var allProduct = [];
var searchrows = 8;
var nowPage = 1;
var buttonId = "";
var pord = "";
function a_txt(data) {
    pord = data;
    index.oneProductInfo(data);
}
function productInfo(data) {
    buttonId = data;
}
var index = {
    init: function () {
        var me = this;
        //首页信息
        me.showIndexInfo();
        //导航栏点击事件
        me.tabShow();
        //售后服务
        me.producthasBuy();
    },
    tabShow: function () {
        $("#index").show();
        $("#product").hide();
        $("#service").hide();
        $("#about").hide();
        $("#oneProduct").hide();
        $("#tab_index").bind("click", function () {
            $("#index").show();
            $("#product").hide();
            $("#service").hide();
            $("#about").hide();
            $("#oneProduct").hide();
        });
        $("#tab_product").bind("click", function () {
            $("#index").hide();
            $("#product").show();
            $("#service").hide();
            $("#about").hide();
            $("#oneProduct").hide();
        });
        $("#tab_service").bind("click", function () {
            $("#index").hide();
            $("#product").hide();
            $("#service").show();
            $("#about").hide();
            $("#oneProduct").hide();
        });
        $("#tab_about").bind("click", function () {
            $("#index").hide();
            $("#product").hide();
            $("#service").hide();
            $("#about").show();
            $("#oneProduct").hide();
        });
    },
    showIndexInfo: function () {
        var params = {};
        var me = this;
        params.code = "index";

        //3条最热的旅游套餐（购买数量最多的）
        Invoker.invokeRequest("travelInfoController/hotTravelInfo", params, function login(data) {
            var result = data.result.result;
            for (var i = 0; i < 3; i++) {
                var html = "<div class=\"col-lg-4 col-md-4 col-sm-6\">" +
                    "<input type='hidden'>" +
                    "<div class=\"tm-home-box-1 tm-home-box-1-2 tm-home-box-1-center\">" +
                    "<img style='height: 400px;width: 100%' src='" +
                    result[i].travel_detail_picture +
                    "' " +
                    "alt=\"image\" class=\"img-responsive\">" +
                    "<a onclick='a_txt("+result[i].travel_id+")' id='1' href='javascript:void(0)'>" +
                    "<div class=\"tm-green-gradient-bg tm-city-price-container\">" +
                    "<span>" + result[i].travel_name + "</span>\n" +
                    "<span>￥" + result[i].travel_price + "</span>\n" +
                    "</div>" +
                    "</a>" +
                    "</div>" +
                    "</div>";
                $("#hotTravel").append(html);
            }
        });

        //四条最新旅游套餐
        Invoker.invokeRequest("travelInfoController/newTravelInfo", params, function login(data) {
            var result = data.result.result;
            for (var i = 0; i < 4; i++) {
                var html = "<div class=\"col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xxs-12\">" +
                    "<div class=\"tm-home-box-2\">" +
                    "<img style='width: 100%;height: 250px' src='" + result[i].travel_detail_picture + "' alt=\"image\" class=\"img-responsive\">" +
                    "<h3>" + result[i].travel_name + "</h3>" +
                    "<p class=\"tm-date\">" + result[i].travel_addDate + "</p>" +
                    "<div class=\"tm-home-box-2-container\">" +
                    "<a href=\"javascript:void(0)\" class=\"tm-home-box-2-link\"><i class=\"fa fa-heart tm-home-box-2-icon border-right\"></i></a>" +
                    "<a onclick='a_txt("+result[i].travel_id+")' href=\"javascript:void(0)\" class=\"tm-home-box-2-link\"><span class=\"tm-home-box-2-description\">了解一下</span></a>" +
                    "<a href=\"javascript:void(0)\" class=\"tm-home-box-2-link\"><i class=\"fa fa-edit tm-home-box-2-icon border-left\"></i></a>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                $("#newTravel").append(html);
            }
        });
        me.showProductInfo();
    },
    showProductInfo: function () {
        var params = {};
        var me = this;
        params.code = "product";
        Invoker.invokeRequest("travelInfoController/newTravelInfo", params, function login(data) {
            var result = data.result.result;
            allProduct = result;
            me.productPageJump(1, 8, result);
            me.productModifyPage(1);
            me.jumpPageClick();
        });
    },

    /**
     *
     * @param nowPage 当前页
     * @param rows 显示几条数据
     * @param data 要显示的数据（数组或map）
     */
    //分页显示数据信息
    productPageJump: function (nowPage, rows, data) {
        pickUpnowPage = nowPage;
        $("#allproducts").empty();
        if (data.length != 0) {
            $("#pageInfo").show();
            //总页数
            var totalPage = Math.ceil(data.length / rows);
            if (Number.isInteger(nowPage)) {
                if (nowPage < totalPage + 1 && nowPage > 0) {
                    var result = data;
                    var tr = "";
                    var size = nowPage * rows;
                    if (result.length < size) {
                        size = result.length;
                    }
                    for (var i = (nowPage - 1) * rows; i < size; i++) {
                        var html = "<div style='margin-top: 20px' class=\"col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xxs-12\">" +
                            "<div class=\"tm-home-box-2\">" +
                            "<img style='width: 100%;height: 250px' src='" + result[i].travel_detail_picture + "' alt=\"image\" class=\"img-responsive\">" +
                            "<h3>" + result[i].travel_name + "</h3>" +
                            "<p class=\"tm-date\">" + result[i].travel_addDate + "</p>" +
                            "<div class=\"tm-home-box-2-container\">" +
                            "<a href=\"#\" class=\"tm-home-box-2-link\"><i class=\"fa fa-heart tm-home-box-2-icon border-right\"></i></a>" +
                            "<a onclick='a_txt("+result[i].travel_id+")' href=\"#\" class=\"tm-home-box-2-link\"><span class=\"tm-home-box-2-description\">了解一下</span></a>" +
                            "<a href=\"#\" class=\"tm-home-box-2-link\"><i class=\"fa fa-edit tm-home-box-2-icon border-left\"></i></a>" +
                            "</div>" +
                            "</div>" +
                            "</div>";
                        $("#allproducts").append(html);
                    }
                }
                else {
                    var error_tr = '<font color="red">暂无数据</font>';
                    $("#allproducts").empty();
                    $("#pageInfo").hide();
                    $("#allproducts").append(error_tr);
                }
            }
        }
    },
    //更新分页插件信息
    productModifyPage:function (nowPages) {
        nowPage = nowPages;
        $("#first").show();
        $("#second").show();
        $("#third").show();
        if(Math.ceil(allProduct.length/searchrows) < 3){
            if(Math.ceil(allProduct.length/searchrows) == 1){
                $("#second").hide();
                $("#third").hide();
            }
            if(Math.ceil(allProduct.length/searchrows) == 2){
                $("#third").hide();
            }
        }else {
            $("#first").html(nowPages);
            $("#second").html(nowPages-1);
            $("#third").html(nowPages+1);
        }
    },
    jumpPageClick:function () {
        var me= this;
        $("#upPage").bind("click",function () {
            var code = nowPage;
            if(code>1){
                me.productModifyPage(code-1);
                me.productPageJump(code-1,searchrows,allProduct)
            }
        });
        $("#next").bind("click",function () {
            var code = nowPage;
            if(code < Math.ceil(allProduct.length/searchrows) && code > 0){
                me.productModifyPage(code+1);
                me.productPageJump(code+1,searchrows,allProduct)
            }
        });
        $("#jump").bind("click",function () {
            var code = parseInt($("#jump_text").val());
            if(code< Math.ceil(allProduct.length/searchrows)+1){
                me.productModifyPage(code);
                me.productPageJump(code,searchrows,allProduct);
            }
        });
    },
    oneProductInfo:function (data) {
        $("#productDetail").empty();
        var params = {};
        params.travel_id = data;
        Invoker.invokeRequest("travelInfoController/TravelInfo", params, function login(data) {
            var result = data.result.result[0];
            $("#index").hide();
            $("#product").hide();
            $("#service").hide();
            $("#about").hide();
            $("#oneProduct").show();
            var html = "<div class=\"col-lg-6 col-md-6 col-sm-6 col-xs-12\" style=\"margin-left: 25%\">" +
                "<div class=\"tm-tours-box-1\">" +
                "<img style='width: 100%;height: 250px' src='"+result.travel_detail_picture+"' alt=\"image\" class=\"img-responsive\" style=\"width: 100%;height: 300px\">" +
                "<div class=\"tm-tours-box-1-info\">" +
                "<div class=\"tm-tours-box-1-info-left\">" +
                "<p class=\"text-uppercase margin-bottom-20\">"+result.travel_name+"</p>" +
                "<p class=\"gray-text\">"+result.travel_addDate+"</p>" +
                "</div>\n" +
                "<div class=\"tm-tours-box-1-info-right\">" +
                "<p class=\"gray-text tours-1-description\">"+result.travel_description+"</p>" +
                "</div>\n" +
                "</div>\n" +
                "<div class=\"tm-tours-box-1-link\">" +
                "<div class=\"tm-tours-box-1-link-left\" style=\"width: 60%\">" +
                "旅游天数: 5 days\n" +
                "</div>\n" +
                "<a data-toggle=\"modal\" data-target=\"#order_mode\" href=\"javascript:void(0)\" class=\"tm-tours-box-1-link-right\" style=\"width: 40%\">" +
                "$1,200&nbsp;下单\n" +
                "</a>\n" +
                "</div>\n" +
                "</div>\n" +
                "</div>";
            $("#productDetail").append(html);
        });

        $("#order").bind("click",function () {
            var params = {};
            params.type = "01";
            params.travel_id = pord;
            Invoker.invokeRequest("travelInfoController/addOrder", params, null);
            alert("下单成功！");
            window.location.href="../index/index.html";
        });
    },
    producthasBuy:function () {
        var params = {};
        var me = this;
        Invoker.invokeRequest("travelInfoController/hasBuyInfo", params, function login(data) {
            var result = data.result;
            for(var i = 0 ;i<result.length;i++){
                var html = "<div class=\"tm-about-box-2 margin-bottom-30\">\n" +
                    "<img style='width: 100%;height: 250px' src='"+result[i].travel_detail_picture+"' alt=\"image\" class=\"tm-about-box-2-img\">\n" +
                    "<div class=\"tm-about-box-2-text\">\n" +
                    "<h3 class=\"tm-about-box-2-title\">"+result[i].travel_name+"</h3>\n" +
                    "<div id='msg"+result[i].travel_id+ "'>"+
                    "<p class=\"tm-about-box-2-description gray-text\">"+result[i].travel_description+"</p>\n" +
                    "<p class=\"tm-about-box-2-footer\">\n" +
                    "<button onclick='productInfo("+result[i].travel_id+")' id='msg' type=\"button\" class=\"btn btn-secondary msg\">我要评价</button>\n" +
                    "</p>\n" +
                    "</div></div>\n" +
                    "</div>";
                $("#myProduct").append(html);

            }
            me.prodClick();
        });
        Invoker.invokeRequest("commentController/allMessage", params, function login(data) {
            var result = data.result;
            var size = result.length;
            if(size > 10){
                size = 10;
            }
            for (var i = 0;i < size;i++){
                var html = "<div class=\"tm-testimonial\">\n" +
                    "<p>"+result[i].travel_name+"&nbsp;&nbsp;"+result[i].message_detail+"</p>\n" +
                    "<strong class=\"text-uppercase\">评价人："+result[i].user_name+"</strong>" +
                    "</div>";
                $("#new_message").append(html);
            }
        });
    },
    prodClick:function () {
        $(".msg").bind("click",function () {
            var html = "<div id=\"add_msg\" class=\"input-group\"" +
                "<div class=\"input-group-prepend\">\n" +
                "<span class=\"input-group-text\">说出我的评价</span>\n" +
                "</div>\n" +
                "</div>" +
                "<button id=\"sub\" type=\"button\" class=\"btn btn-secondary sub_\">提交</button>";
            var button = "msg"+buttonId;
            $( "#" + button +"").empty();
            $( "#" + button +"").append(html);
            $("#add_msg").append("<input type='text' id='nihao' style='width: 400px;height: 90px' class='form-control'>");
            $(".sub_").bind("click",function () {
                var button = "msg"+buttonId;
                var msg = $("#nihao").val();
                var params = {};
                params.detail = msg;
                params.travelId = buttonId;
                Invoker.invokeRequest("commentController/addMessage", params, function login(data) {
                });
                $( "#" + button +"").empty();
                $( "#" + button +"").append("评价成功！感谢支持");
            })
        });

    }
};
$(function () {
        index.init();
    }
);