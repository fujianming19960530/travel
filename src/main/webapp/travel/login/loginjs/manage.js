var dataTemp = [];
var index_nowpage = 1;
var indexrows = 10;
var index = "userInfo";
var manage = {
    init: function () {
        var me = this;
        me.menuClick();
        $("#userInfo").click();
    },
    menuClick: function () {
        var me = this;
        var th = "";
        $("#userInfo").bind("click", function () {
            index = "userInfo";
            $("#head_travel").empty();
            $("#head_travel").append("<h3>用户信息管理</h3>");
            $("#header_travel").empty();
            $("#header_travel").append("<p>用户信息概览</p>");
            $("#thead_travel").empty();
            th = "<tr>\n" +
                "                                    <th>用户姓名</th>\n" +
                "                                    <th>登录账号</th>\n" +
                "                                    <th>联系方式</th>\n" +
                "                                    <th>注册时间</th>\n" +
                "                                    <th>联系地址</th>\n" +
                "                                    <th>操作</th>\n" +
                "                                </tr>";
            $("#thead_travel").append(th);
            index_nowpage = 1;
            me.userInfoshow();
        });
        $("#travlInfo").bind("click", function () {
            index = "travelInfo";
            var btn = "<button id=\"act_push\" data-toggle='modal' data-target='#act_pu' type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">设置首页推送活动" +
                "                        </button>&nbsp;&nbsp;&nbsp;";
            var add_btn = "<button id=\"act_add\" data-toggle='modal' data-target='#detail' type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">新增套餐信息" +
                "                        </button>";
            $("#head_travel").empty();
            $("#head_travel").append("<h3>旅游信息管理</h3>");
            $("#header_travel").empty();
            $("#header_travel").append("<p>旅游信息概览</p>");
            $("#header_travel").append(btn);
            $("#header_travel").append(add_btn);
            $("#thead_travel").empty();
            th = "<tr>\n" +
                "                                    <th>套餐名称</th>\n" +
                "                                    <th>添加时间</th>\n" +
                "                                    <th>总下单次数</th>\n" +
                "                                    <th>套餐单价</th>\n" +
                "                                    <th>操作</th>\n" +
                "                                </tr>";
            $("#thead_travel").append(th);
            index_nowpage = 1;
            me.travelInfoshow();
            $("#act_add").bind("click", function () {
                var travel_name = "<div class=\"form-group\">\n" +
                    "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游名称</label>\n" +
                    "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                    "                                                    <input class=\"form-control\" id=\"dt_travel_name\" type=\"text\"\n" +
                    "                                                           placeholder=\"\">\n" +
                    "                                                </div>\n" +
                    "                                            </div>";
                var travel_detail = "<div class=\"form-group\">\n" +
                    "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游介绍</label>\n" +
                    "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                    "                                                    <textarea class=\"form-control\" id=\"dt_travel_detail\" \n" +
                    "                                                           placeholder=\"\">\n" +
                    "                                                </div>\n" +
                    "                                            </div>";
                var travel_price = "<div class=\"form-group\">\n" +
                    "                                                <label class=\"col-sm-2 col-sm-2 control-label\">套餐价格</label>\n" +
                    "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                    "                                                    <input class=\"form-control\" id=\"dt_travel_price\" \n" +
                    "                                                           placeholder=\"\">\n" +
                    "                                                </div>\n" +
                    "                                            </div>";
                var travel_time = "<div class=\"form-group\">\n" +
                    "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游天数</label>\n" +
                    "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                    "                                                    <input class=\"form-control\" id=\"dt_travel_time\" \n" +
                    "                                                           placeholder=\"\">\n" +
                    "                                                </div>\n" +
                    "                                            </div>";
                var form = "<div class=\"form-group\">\n" +
                    "<form id=\"form\" method=\"post\" enctype=\"multipart/form-data\">" +
                    " <label class=\"col-sm-2 col-sm-2 control-label\">旅游图片</label>\n" +
                    "<input multiple=\"multiple\" id='file1' onchange=\"uploadImg(this)\" type = \"file\" name= 'file' />" +
                    "<input multiple=\"multiple\" id='file2' onchange=\"uploadImg(this)\" type = \"file\" name= 'file' />" +
                    "<input style='margin-left: 100px' multiple=\"multiple\" id='file3' onchange=\"uploadImg(this)\" type = \"file\" name= 'file' /></br>" +
                    "<input id=\"upload\" hidden='hidden' name=\"upload\" type=\"button\" value=\"上传\">" +
                    "<img style='width: 240px;height: 300px;margin-left: 30%' id=\"viewImg\"/>" +
                    "</form></div>";
                $("#home-pillss").empty();
                $("#home-pillss").append(travel_name);
                $("#home-pillss").append(travel_detail);
                $("#home-pillss").append(travel_price);
                $("#home-pillss").append(travel_time);
                $("#home-pillss").append(form);
                $("#dt_travel_detail").empty();
                var btn = "<button id=\"upInfo\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">提交\n" +
                    "</button>";
                $("#user_dt").empty();
                $("#user_dt").append(btn);
                $("#upInfo").bind("click", function () {
                    var param = {};
                    param.travel_name = $("#dt_travel_name").val();
                    param.travel_description = $("#dt_travel_detail").val();
                    param.travel_price = $("#dt_travel_price").val();
                    param.travel_time = $("#dt_travel_time").val();
                    var path1 = $("#file1").val();
                    var path2 = $("#file2").val();
                    var path3 = $("#file3").val();
                    var filename1 = "img/" + path1.substring(12, path1.length);
                    var filename2 = "img/" + path2.substring(12, path2.length);
                    var filename3 = "img/" + path3.substring(12, path3.length);
                    param.travel_detail_picture = filename1;
                    param.pic_one = filename1;
                    param.pic_two = filename2;
                    param.pic_three = filename3;
                    Invoker.fileUpload("adminController/upload", "form", null);
                    Invoker.invokeRequest("adminController/insertTravelInfo", param, null);
                    alert("新增成功！");
                    $("#travlInfo").click();
                });
            });
            $("#act_push").bind("click", function () {
                //追加推荐活动
                var act_param = {};
                act_param.index = "";
                var option = "";
                $("#home-pill").empty();
                $("#home-pill").append("<div class=\"form-group\">\n" +
                    "                                                <label class=\"col-sm-2 col-sm-2 control-label\">推荐活动1</label>\n" +
                    "                                                <div class=\"col-md-6 col-sm-6\"><select id=\"act_sel1\" style=\"width: 200px\" class=\"form-control sel\"></select></div></div>");
                $("#home-pill").append("<div class=\"form-group\">\n" +
                    "                                                <label class=\"col-sm-2 col-sm-2 control-label\">推荐活动2</label>\n" +
                    "                                                <div class=\"col-md-6 col-sm-6\"><select id=\"act_sel2\" style=\"width: 200px\" class=\"form-control sel\"></select></div></div>");
                $("#home-pill").append("<div class=\"form-group\">\n" +
                    "                                                <label class=\"col-sm-2 col-sm-2 control-label\">推荐活动3</label>\n" +
                    "                                                <div class=\"col-md-6 col-sm-6\"><select id=\"act_sel3\" style=\"width: 200px\" class=\"form-control sel\"></select></div></div>");
                Invoker.invokeRequest("adminController/queryActpush", act_param, function gg(data) {
                    var result = data.result;
                    var option1 = "<option value='" + result[0].travel_id + "'>" + result[0].travel_name + "</option>";
                    var option2 = "<option value='" + result[1].travel_id + "'>" + result[1].travel_name + "</option>";
                    var option3 = "<option value='" + result[2].travel_id + "'>" + result[2].travel_name + "</option>";
                    $("#act_sel1").append(option1);
                    $("#act_sel2").append(option2);
                    $("#act_sel3").append(option3);
                    Invoker.invokeRequest("travelInfoController/TravelInfo", act_param, function login(data) {
                        var result = data.result.result;
                        for (var i = 0; i < result.length; i++) {
                            option = option + "<option value='" + result[i].travel_id + "'>" + result[i].travel_name + "</option>"
                        }
                        $("#act_sel1").append(option);
                        $("#act_sel2").append(option);
                        $("#act_sel3").append(option);
                    });
                });

                $("#sub_act_push").bind("click", function () {
                    var param1 = {};
                    param1.push_act_actId = $("#act_sel1").val();
                    param1.pushAct_id = "1";
                    var param2 = {};
                    param2.push_act_actId = $("#act_sel2").val();
                    param2.pushAct_id = "2";
                    var param3 = {};
                    param3.push_act_actId = $("#act_sel3").val();
                    param3.pushAct_id = "3";
                    Invoker.invokeRequest("adminController/updateActpush", param1, null);
                    Invoker.invokeRequest("adminController/updateActpush", param2, null);
                    Invoker.invokeRequest("adminController/updateActpush", param3, null);
                    alert("首页推荐活动更新成功");
                    $("#travlInfo").click();
                });
            });

        });
        $("#payInfo").bind("click", function () {
            index = "payInfo";
            $("#head_travel").empty();
            $("#head_travel").append("<h3>消费信息管理</h3>");
            $("#header_travel").empty();
            $("#header_travel").append("<p>消费信息概览</p>");
            $("#thead_travel").empty();
            th = "<tr>\n" +
                "                                    <th>用户姓名</th>\n" +
                "                                    <th>登录账号</th>\n" +
                "                                    <th>消费金额</th>\n" +
                "                                    <th>消费时间</th>\n" +
                "                                    <th>操作</th>\n" +
                "                                </tr>";
            $("#thead_travel").append(th);
            index_nowpage = 1;
            me.payInfoshow();
        });
        $("#userMsgInfo").bind("click", function () {
            index = "msgInfo";
            $("#head_travel").empty();
            $("#head_travel").append("<h3>用户评论管理</h3>");
            $("#header_travel").empty();
            $("#header_travel").append("<p>用户评论概览</p>");
            $("#thead_travel").empty();
            th = "<tr>\n" +
                "                                    <th>用户姓名</th>\n" +
                "                                    <th>登录账号</th>\n" +
                "                                    <th>联系方式</th>\n" +
                "                                    <th>留言时间</th>\n" +
                "                                    <th>操作</th>\n" +
                "                                </tr>";
            $("#thead_travel").append(th);
            index_nowpage = 1;
            me.msgInfoshow();
        });
        $("#sub_act_push").bind("click", function () {
            console.log($("#act_sel").val());
        });
    },
    //加载全部的用户信息
    userInfoshow: function () {
        var me = this;
        var param = {};
        param.index = "";
        Invoker.invokeRequest("adminController/queryUserInfo", param, function login(data) {
            var result = data.result;
            dataTemp = result;
            me.pageJump(index_nowpage, indexrows, result);
            me.modifyPage(index_nowpage);
        });

    },

    //加载全部的旅游套餐信息
    travelInfoshow: function () {
        var me = this;
        var param = {};
        param.index = "";
        Invoker.invokeRequest("travelInfoController/TravelInfo", param, function login(data) {
            var result = data.result.result;
            dataTemp = result;
            me.pageJump(index_nowpage, indexrows, result);
            me.modifyPage(index_nowpage);
        });
    },

    //加载全部的消费信息
    payInfoshow: function () {
        var me = this;
        var param = {};
        param.index = "";
        Invoker.invokeRequest("adminController/allPayInfo", param, function login(data) {
            var result = data.result;
            dataTemp = result;
            me.pageJump(index_nowpage, indexrows, result);
            me.modifyPage(index_nowpage);
        });
    },
    //加载全部的留言信息
    msgInfoshow: function () {
        var me = this;
        var param = {};
        param.index = "";
        Invoker.invokeRequest("adminController/allMessages", param, function login(data) {
            var result = data.result;
            dataTemp = result;
            me.pageJump(index_nowpage, indexrows, result);
            me.modifyPage(index_nowpage);
        });
    },
    //分页点击事件
    pageClick: function () {
        var me = this;
        $("#Fist").bind("click", function () {
            var code = parseInt($("#One").html());
            me.modifyPage(code);
            me.pageJump(code, indexrows, dataTemp);
        });
        $("#Last").bind("click", function () {
            var code = parseInt(Math.ceil(dataTemp.length / indexrows));
            me.modifyPage(code);
            me.pageJump(code, indexrows, dataTemp)
        });
        $("#Uppage").bind("click", function () {
            var code = index_nowpage;
            if (code > 1) {
                me.modifyPage(code - 1);
                me.pageJump(code - 1, indexrows, dataTemp)
            }
        });
        $("#Nextpage").bind("click", function () {
            var code = index_nowpage;
            if (code < Math.ceil(dataTemp.length / indexrows) && code > 0) {
                me.modifyPage(code + 1);
                me.pageJump(code + 1, indexrows, dataTemp)
            }
        });
        $("#JumpPage").bind("click", function () {
            var code = parseInt($("#jump_text").val());
            if (code < Math.ceil(dataTemp.length / indexrows) + 1) {
                me.modifyPage(code);
                me.pageJump(code, indexrows, dataTemp);
            }
        });
    },
    //控件信息
    modifyPage: function (nowPage) {
        $("#One").html(nowPage);
    },
    /**
     *
     * @param nowPage 当前页
     * @param rows 每页显示的条数
     * @param data 显示的数据
     */
    pageJump: function (nowPage, rows, data) {
        var me = this;
        index_nowpage = nowPage;
        $("#tbody_travel").empty();
        if (data.length != 0) {
            $("#pageUl").show();
            var indexPagetotalPage = Math.ceil(data.length / rows); //总页数
            if (Number.isInteger(nowPage)) {
                if (nowPage < indexPagetotalPage + 1 && nowPage > 0) {
                    var result = data;
                    var size = nowPage * rows;
                    if (result.length < size) {
                        size = result.length;
                    }
                    if (index == "userInfo") {
                        me.userInfoPage(size, result);
                    }
                    if (index == "travelInfo") {
                        me.travelInfoPage(size, result);
                    }
                    if (index == "payInfo") {
                        me.payInfoPage(size, result);
                    }
                    if (index == "msgInfo") {
                        me.msgInfoPage(size, result);
                    }
                }
            }
        } else {
            var error_tr = '<tr><td colspan="3" align="center"><font color="red">暂无数据</font></td></tr>';
            $("#tbody_travel").empty();
            $("#pageUl").hide();
            $("#tbody_travel").append(error_tr);
        }
        me.pageClick();
    },
    userInfoPage: function (size, result) {
        for (var i = (index_nowpage - 1) * indexrows; i < size; i++) {
            var detail = "<a data-toggle=\"modal\" onclick='detailShow(" + result[i].account + ")' data-target=\"#detail\" href=\"#\" class=\"tm-tours-box-1-link-right\" style=\"width: 40%\">查询详情</a>&nbsp;&nbsp;" +
                "<a data-toggle=\"modal\" onclick='updateInfoShow(" + result[i].account + ")' data-target=\"#detail\" href=\"#\" class=\"tm-tours-box-1-link-right\" style=\"width: 40%\">修改</a>&nbsp;&nbsp;" +
                "<a data-toggle=\"modal\" onclick='deleteInfoShow(" + result[i].account + ")' href=\"#\" style=\"width: 40%\">删除</a>";
            var html = "<tr>" +
                "<td>" + result[i].user_name + "</td>" +
                "<td>" + result[i].account + "</td>" +
                "<td>" + result[i].mobile_phone + "</td>" +
                "<td>" + result[i].signin_date + "</td>" +
                "<td>" + result[i].address + "</td>" +
                "<td>" +
                detail
                + "</td>" +
                "</tr>";
            $("#tbody_travel").append(html);
        }
    },
    travelInfoPage: function (size, result) {
        for (var i = (index_nowpage - 1) * indexrows; i < size; i++) {
            var detail = "<a data-toggle=\"modal\" onclick='detailShow(" + result[i].travel_id + ")' data-target=\"#detail\" href=\"#\" class=\"tm-tours-box-1-link-right\" style=\"width: 40%\">查询详情</a>&nbsp;&nbsp;" +
                "<a data-toggle=\"modal\" onclick='updateInfoShow(" + result[i].travel_id + ")' data-target=\"#detail\" href=\"#\" class=\"tm-tours-box-1-link-right\" style=\"width: 40%\">修改</a>&nbsp;&nbsp;" +
                "<a data-toggle=\"modal\" onclick='deleteInfoShow(" + result[i].travel_id + ")' href=\"#\" style=\"width: 40%\">删除</a>";
            var html = "<tr>" +
                "<td>" + result[i].travel_name + "</td>" +
                "<td>" + result[i].travel_addDate + "</td>" +
                "<td>" + result[i].travel_Byno + "</td>" +
                "<td>" + result[i].travel_price + "</td>" +
                "<td>" +
                detail
                + "</td>" +
                "</tr>";
            $("#tbody_travel").append(html);
        }
    },
    payInfoPage: function (size, result) {
        for (var i = (index_nowpage - 1) * indexrows; i < size; i++) {
            var detail = "暂无操作";
            var html = "<tr>" +
                "<td>" + result[i].user_name + "</td>" +
                "<td>" + result[i].account + "</td>" +
                "<td>" + result[i].transaction_number + "</td>" +
                "<td>" + result[i].transaction_date + "</td>" +
                "<td>" +
                detail
                + "</td>" +
                "</tr>";
            $("#tbody_travel").append(html);
        }
    },
    msgInfoPage: function (size, result) {
        for (var i = (index_nowpage - 1) * indexrows; i < size; i++) {
            var detail = "<a data-toggle=\"modal\" onclick='detailShow(" + result[i].message_id + ")' data-target=\"#detail\" href=\"#\" class=\"tm-tours-box-1-link-right\" style=\"width: 40%\">查看</a>&nbsp;&nbsp;" +
                "<a data-toggle=\"modal\" onclick='deleteInfoShow(" + result[i].message_id + ")' href=\"#\" style=\"width: 40%\">删除</a>";
            var html = "<tr>" +
                "<td>" + result[i].user_name + "</td>" +
                "<td>" + result[i].account + "</td>" +
                "<td>" + result[i].mobile_phone + "</td>" +
                "<td>" + result[i].message_date + "</td>" +
                "<td>" +
                detail
                + "</td>" +
                "</tr>";
            $("#tbody_travel").append(html);
        }
    },
};

//查看详情方法
function detailShow(id) {
    $("#user_dt").empty();
    if (index == "userInfo") {
        var me = this;
        var param = {};
        param.account = id;
        Invoker.invokeRequest("adminController/queryUserInfo", param, function ss(data) {
            var username = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">姓名</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_user_name\" disabled type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var account = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">账号</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_account\" disabled type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var signupdate = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">注册时间</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_signupdate\" disabled type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var phone = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">联系方式</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_phone\" disabled type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var address = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">联系地址</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_address\" disabled type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            $("#home-pillss").empty();
            $("#home-pillss").append(username);
            $("#home-pillss").append(account);
            $("#home-pillss").append(signupdate);
            $("#home-pillss").append(phone);
            $("#home-pillss").append(address);
            var result = data.result[0];
            $("#dt_user_name").val(result.user_name);
            $("#dt_account").val(result.account);
            $("#dt_signupdate").val(result.signin_date);
            $("#dt_phone").val(result.mobile_phone);
            $("#dt_address").val(result.address);
            $("#user_dt").empty();
        });
    }
    if (index == "travelInfo") {
        var me = this;
        var param = {};
        param.travel_id = id;
        Invoker.invokeRequest("travelInfoController/TravelInfo", param, function ss(data) {
            var result = data.result.result[0];
            var travel_name = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游名称</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_travel_name\" type=\"text\"\n" +
                "                                                          disabled placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var travel_detail = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游介绍</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <textarea class=\"form-control\" id=\"dt_travel_detail\" \n" +
                "                                                           disabled placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var travel_price = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">套餐价格</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_travel_price\" \n" +
                "                                                           disabled placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var travel_time = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游天数</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_travel_time\" \n" +
                "                                                           disabled placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var form = "<div class=\"form-group\">\n" +
                " <label class=\"col-sm-2 col-sm-2 control-label\">旅游图片</label>\n" +
                "    <img style='width: 240px;height: 300px;margin-left: 10%' id=\"viewImg\"/>" +
                "</div>";
            $("#home-pillss").empty();
            $("#home-pillss").append(travel_name);
            $("#home-pillss").append(travel_detail);
            $("#home-pillss").append(travel_price);
            $("#home-pillss").append(travel_time);
            $("#home-pillss").append(form);
            $("#dt_travel_name").val(result.travel_name);
            $("#dt_travel_detail").val(result.travel_description);
            $("#dt_travel_price").val(result.travel_price);
            $("#dt_travel_time").val(result.travel_time);
            $("#viewImg").attr("src", "/travel/index/" + result.pic_one);
            var result = data.result.result;
        });
    }
    if (index == "payInfo") {
        /*var me = this;
        var param = {};
        param.transaction_id = id;
        Invoker.invokeRequest("adminController/allPayInfo",param,function login(data){
            var result = data.result;
            console.log(result);
        });*/
    }
    if (index == "msgInfo") {
        var me = this;
        var param = {};
        param.message_id = id;
        Invoker.invokeRequest("adminController/allMessages", param, function ss(data) {
            var result = data.result;
            var username = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">用户姓名</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_user_name\" disabled type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var travel_name = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">套餐名称</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_travelname\" disabled type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var msg_detail = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">评论详情</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <textarea class=\"form-control\" id=\"dt_msg\" disabled type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var reply_detail = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">回复评论</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <textarea class=\"form-control col-md-6 col-sm-6\" id=\"dt_reply\" placeholder='请输入回复用户的信息' type=\"t\">" +
                "                                                </div>\n" +
                "                                            </div>";
            $("#home-pillss").empty();
            $("#home-pillss").append(username);
            $("#home-pillss").append(travel_name);
            $("#home-pillss").append(msg_detail);
            $("#home-pillss").append(reply_detail);
            $("#dt_user_name").empty();
            $("#dt_user_name").val(result[0].user_name);
            $("#dt_travelname").empty();
            $("#dt_travelname").val(result[0].travel_name);
            $("#dt_msg").empty();
            $("#dt_msg").val(result[0].message_detail);
            $("#dt_reply").empty();
            var btn = "<button id=\"upInfo\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">回复" +
                "                        </button>";
            $("#user_dt").empty();
            $("#user_dt").append(btn);
            $("#upInfo").bind("click", function () {
                var param = {};
                var message_id = id;
                var reply = $("#dt_reply").val();
                param.reply = reply;
                param.message_id = message_id;
                Invoker.invokeRequest("adminController/updateMessage", param, null);
                alert("评论成功！")
            });
        });
    }
}

//编辑详情方法
function updateInfoShow(id) {
    console.log(index);
    if (index == "userInfo") {
        var me = this;
        var param = {};
        param.account = id;
        Invoker.invokeRequest("adminController/queryUserInfo", param, function login(data) {
            var username = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">姓名</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_user_name\" type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var password = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">密码</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_password\" type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var phone = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">联系方式</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_phone\" type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var address = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">联系地址</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_address\" type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            $("#home-pillss").empty();
            $("#home-pillss").append(username);
            $("#home-pillss").append(password);
            $("#home-pillss").append(phone);
            $("#home-pillss").append(address);
            var result = data.result[0];
            $("#dt_user_name").val(result.user_name);
            $("#dt_password").val(result.password);
            $("#dt_phone").val(result.mobile_phone);
            $("#dt_address").val(result.address);
            var btn = "<button id=\"upInfo\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">提交\n" +
                "                        </button>";
            $("#user_dt").empty();
            $("#user_dt").append(btn);
            $("#upInfo").bind("click", function () {
                var username = $("#dt_user_name").val();
                var password = $("#dt_password").val();
                var phone = $("#dt_phone").val();
                var address = $("#dt_address").val();
                var param = {};
                param.account = id;
                param.username = username;
                param.password = password;
                param.phone = phone;
                param.address = address;
                Invoker.invokeRequest("adminController/updateUserInfo", param, null);
                alert("用户信息更新成功！");
                $("#userInfo").click();
            });
        });
    }
    if (index == "travelInfo") {
        var me = this;
        var param = {};
        param.travel_id = id;
        Invoker.invokeRequest("travelInfoController/TravelInfo", param, function login(data) {
            var result = data.result.result[0];
            var travel_name = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游名称</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_travel_name\" type=\"text\"\n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var travel_detail = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游介绍</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <textarea class=\"form-control\" id=\"dt_travel_detail\" \n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var travel_price = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">套餐价格</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_travel_price\" \n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var travel_time = "<div class=\"form-group\">\n" +
                "                                                <label class=\"col-sm-2 col-sm-2 control-label\">旅游天数</label>\n" +
                "                                                <div class=\"col-md-6 col-sm-6\">\n" +
                "                                                    <input class=\"form-control\" id=\"dt_travel_time\" \n" +
                "                                                           placeholder=\"\">\n" +
                "                                                </div>\n" +
                "                                            </div>";
            var form = "<div class=\"form-group\">\n" +
                " <label class=\"col-sm-2 col-sm-2 control-label\">旅游图片</label>\n" +
                "<form  id =\"form2\" action=\"http://localhost:8888/travel/adminController/upload2\" enctype=\"multipart/form-data\" method=\"post\">\n" +
                "<input multiple=\"multiple\" id='file1' onchange=\"uploadImg(this)\" type = \"file\" name= 'file' />\n" +
                "<input multiple=\"multiple\" id='file2' onchange=\"uploadImg(this)\" type = \"file\" name= 'file' />" +
                "<input style='margin-left: 100px' multiple=\"multiple\" id='file3' onchange=\"uploadImg(this)\" type = \"file\" name= 'file' /></br>" +
                "    <img style='width: 240px;height: 300px;margin-left: 10%' id=\"viewImg\"/>" +
                "    <input id='img_sub' hidden='hidden' type =\"submit\" value=\"直接上传\">\n" +
                "</form></div>";
            $("#home-pillss").empty();
            $("#home-pillss").append(travel_name);
            $("#home-pillss").append(travel_detail);
            $("#home-pillss").append(travel_price);
            $("#home-pillss").append(travel_time);
            $("#home-pillss").append(form);
            $("#dt_travel_name").val(result.travel_name);
            $("#dt_travel_detail").val(result.travel_description);
            $("#dt_travel_price").val(result.travel_price);
            $("#dt_travel_time").val(result.travel_time);
            $("#viewImg").attr("src", "/travel/index/" + result.pic_one);
            var btn = "<button id=\"upInfo\" type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">提交" +
                "                        </button>";
            $("#user_dt").empty();
            $("#user_dt").append(btn);
            $("#upInfo").bind("click", function () {
                var param = {};
                param.travel_name = $("#dt_travel_name").val();
                param.travel_description = $("#dt_travel_detail").val();
                param.travel_price = $("#dt_travel_price").val();
                param.travel_time = $("#dt_travel_time").val();
                var path1 = $("#file1").val();
                var path2 = $("#file2").val();
                var path3 = $("#file3").val();
                var filename1 = "img/" + path1.substring(12, path1.length);
                var filename2 = "img/" + path2.substring(12, path2.length);
                var filename3 = "img/" + path3.substring(12, path3.length);
                if (filename1 == "img/") {
                    filename1 = result.pic_one;
                }
                if (filename2 == "img/") {
                    filename2 = result.pic_two;
                }
                if (filename3 == "img/") {
                    filename3 = result.pic_three;
                }
                param.travle_picture = filename1;
                param.travel_detail_picture = filename1;
                param.pic_one = filename1;
                param.pic_two = filename2;
                param.pic_three = filename3;
                param.travel_id = id;
                Invoker.fileUpload("adminController/upload", "form2", null);
                Invoker.invokeRequest("adminController/updateTravelInfo", param, function gg(data) {
                    alert("旅游信息更新成功！");
                    $("#travlInfo").click();
                });
            });
        });
    }
    if (index == "payInfo") {
        var me = this;
        var param = {};
        param.transaction_id = id;
        Invoker.invokeRequest("adminController/allPayInfo", param, function login(data) {
            var result = data.result;
            console.log(result);
        });
    }
    if (index == "msgInfo") {
        var me = this;
        var param = {};
        param.message_id = id;
        Invoker.invokeRequest("adminController/allMessages", param, function login(data) {
            var result = data.result;
            console.log(result);
        });
    }
}

//删除详情方法
function deleteInfoShow(id) {
    if (index == "userInfo") {
        var me = this;
        var param = {};
        param.account = id;
        Invoker.invokeRequest("adminController/delUserInfo", param, null);
        alert("用户信息删除成功！");
        $("#userInfo").click();
    }
    if (index == "travelInfo") {
        var me = this;
        var param = {};
        param.travel_id = id;
        Invoker.invokeRequest("adminController/delTravelInfo", param, null);
        alert("套餐信息删除成功！");
        $("#travlInfo").click();
    }
    if (index == "payInfo") {
        var me = this;
        var param = {};
        param.transaction_id = id;
        Invoker.invokeRequest("adminController/allPayInfo", param, null);
    }
    if (index == "msgInfo") {
        var me = this;
        var param = {};
        param.message_id = id;
        Invoker.invokeRequest("adminController/delMessage", param, null);
        alert("评论信息删除成功！");
        $("#userMsgInfo").click();
    }
}

function uploadImg(fileDom) {
    // 获取图片数据对象
    var file = fileDom.files[0];
    //对图片内容进行base64编码
    var reader = new FileReader();
    reader.readAsDataURL(file);

    //确保文件成功获取，base64数据量比较大
    reader.onload = function (event) {
        var e = event || window.event;
        var img = document.getElementById("viewImg");
        img.src = e.target.result;
        //或者 img.src = this.result; 因为e.target == this
    };
}

$(function () {
        manage.init();
    }
);