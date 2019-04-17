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

@RequestMapping("/commentController")
@Controller
public class CommentController {

    @Autowired
    private HomeServiceInterface homeService;

    @RequestMapping("/addComment")
    @ResponseBody
    public ResponseResult addCommentInfo(@RequestBody Map<String,String> request){
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        homeService.addComment(request);
        return result;
    }

    @RequestMapping("/addMessage")
    @ResponseBody
    public ResponseResult addMessages(@RequestBody Map<String,String> request){
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        homeService.addMessage(request);
        return result;
    }

    @RequestMapping("/allMessage")
    @ResponseBody
    public ResponseResult allMessages(@RequestBody Map<String,String> request){
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        result = homeService.allMessages(request);
        return result;
    }
}
