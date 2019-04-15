var index ={
    init:function () {
        var me = this;
        me.showIndexInfo();
    },
    showIndexInfo:function () {
        var params = {};
        params.code = "index";
        Invoker.invokeRequest("travelInfoController/newTravelInfo",params,function login(data){
            console.log(data);
        });
    }
};
$(function () {
        index.init();
    }
);