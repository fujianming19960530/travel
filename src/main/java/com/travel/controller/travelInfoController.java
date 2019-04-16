package com.travel.controller;


import com.travel.core.Const;
import com.travel.core.ResponseResult;
import com.travel.service.HomeServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
@RequestMapping("/travelInfoController")
public class travelInfoController {

    @Autowired
    private HomeServiceInterface homeService;

    @RequestMapping("/newTravelInfo")
    @ResponseBody
    public ResponseResult newTravelInfo(@RequestBody Map<String,String> request){
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        result.setResult(homeService.travelNewInfo(request));
        return result;
    }

    @RequestMapping("/hotTravelInfo")
    @ResponseBody
    public ResponseResult hotTravelInfo(@RequestBody Map<String,String> request){
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        result.setResult(homeService.travelHotInfo(request));
        return result;
    }

    @RequestMapping("/TravelInfo")
    @ResponseBody
    public ResponseResult TravelInfo(@RequestBody Map<String,String> request){
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        result.setResult(homeService.travelInfo(request));
        return result;
    }

    @RequestMapping("/hasBuyInfo")
    @ResponseBody
    public ResponseResult buyInfo(@RequestBody Map<String,String> request){
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        result = homeService.allByProducts(request);
        return result;
    }
}
