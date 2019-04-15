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




}