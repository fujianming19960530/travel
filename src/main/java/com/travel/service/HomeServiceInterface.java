package com.travel.service;


import com.travel.core.ResponseResult;
import org.springframework.stereotype.Service;

import java.util.Map;

/**
 *
 * 处理前端服务请求接口
 *
 */
@Service
public interface HomeServiceInterface {

    /**
     * 用户登录
     * @return
     */
    ResponseResult userLogin(Map<String,String> map);

    /**
     * 查询首页最热旅游信息
     * @param map
     * @return
     */
    ResponseResult travelHotInfo(Map<String,String> map);

    /**
     * 查询首页最新旅游信息
     * @param map
     * @return
     */
    ResponseResult travelNewInfo(Map<String,String> map);

    /**
     * 查询旅游信息详情
     * @param map
     * @return
     */
    ResponseResult travelInfo(Map<String,String> map);

    /**
     * 用户注册
     * @param map
     * @return
     */
    ResponseResult Registertion(Map<String,Object> map);

    /**
     * 添加留言信息
     * @param map
     * @return
     */
    ResponseResult addComment(Map<String,String> map);

    /**
     * 查询全部已买过的套餐
     * @param map
     * @return
     */
    ResponseResult allByProducts(Map<String,String> map);

    /**
     * 添加评价信息
     * @param map
     * @return
     */
    ResponseResult addMessage(Map<String,String> map);

}
