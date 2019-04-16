var allProduct = [];
var index = {
    init: function () {
        var me = this;
        me.showIndexInfo();
        me.tabShow();
        $(document).click(function (e) { // 在页面任意位置点击而触发此事件
            // e.target表示被点击的目标
            console.log($(this).attr("id"));
        })
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
        });
        $("#tab_product").bind("click", function () {
            $("#index").hide();
            $("#product").show();
            $("#service").hide();
            $("#about").hide();
        });
        $("#tab_service").bind("click", function () {
            $("#index").hide();
            $("#product").hide();
            $("#service").show();
            $("#about").hide();
        });
        $("#tab_about").bind("click", function () {
            $("#index").hide();
            $("#product").hide();
            $("#service").hide();
            $("#about").show();
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
                    "<img src='" +
                    result[i].travle_picture +
                    "' " +
                    "alt=\"image\" class=\"img-responsive\">" +
                    "<a href='#'>" +
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
            allProduct = result;
            for (var i = 0; i < 4; i++) {
                var html = "<div class=\"col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xxs-12\">" +
                    "<div class=\"tm-home-box-2\">" +
                    "<img src='" + result[i].travel_detail_picture + "' alt=\"image\" class=\"img-responsive\">" +
                    "<h3>" + result[i].travel_name + "</h3>" +
                    "<p class=\"tm-date\">" + result[i].travel_addDate + "</p>" +
                    "<div class=\"tm-home-box-2-container\">" +
                    "<a href=\"#\" class=\"tm-home-box-2-link\"><i class=\"fa fa-heart tm-home-box-2-icon border-right\"></i></a>" +
                    "<a href=\"#\" class=\"tm-home-box-2-link\"><span class=\"tm-home-box-2-description\">了解一下</span></a>" +
                    "<a href=\"#\" class=\"tm-home-box-2-link\"><i class=\"fa fa-edit tm-home-box-2-icon border-left\"></i></a>" +
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
            for (var i = 0; i < result.length; i++) {
                var html = "<div style='margin-top: 20px' class=\"col-lg-3 col-md-3 col-sm-6 col-xs-6 col-xxs-12\">" +
                    "<div class=\"tm-home-box-2\">" +
                    "<img src='" + result[i].travel_detail_picture + "' alt=\"image\" class=\"img-responsive\">" +
                    "<h3>" + result[i].travel_name + "</h3>" +
                    "<p class=\"tm-date\">" + result[i].travel_addDate + "</p>" +
                    "<div class=\"tm-home-box-2-container\">" +
                    "<a href=\"#\" class=\"tm-home-box-2-link\"><i class=\"fa fa-heart tm-home-box-2-icon border-right\"></i></a>" +
                    "<a href=\"#\" class=\"tm-home-box-2-link\"><span class=\"tm-home-box-2-description\">了解一下</span></a>" +
                    "<a href=\"#\" class=\"tm-home-box-2-link\"><i class=\"fa fa-edit tm-home-box-2-icon border-left\"></i></a>" +
                    "</div>" +
                    "</div>" +
                    "</div>";
                $("#allproducts").append(html);
            }
        });
    }
};
$(function () {
        index.init();
    }
);