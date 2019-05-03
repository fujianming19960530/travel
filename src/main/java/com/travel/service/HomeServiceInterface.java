package com.travel.service;


import com.travel.core.ResponseResult;
import org.springframework.stereotype.Service;

import java.util.List;
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

    /**
     * 查询全部的评价信息
     * @return
     */
    ResponseResult allMessages(Map<String,String> map);

    /**
     * 添加订单消费记录
     * @param map
     * @return
     */
    Integer addProd(Map<String,Object> map);

    /**
     * 查询全部的用户信息
     * @param map
     * @return
     */
    List<Map<String,Object>> queryUserInfo(Map<String,String> map);

    /**
     * 查询全部的消费信息
     * @param map
     * @return
     */
    List<Map<String,Object>> queryPayInfo(Map<String,String> map);

    /**
     * 查询全部的评论信息
     * @param map
     * @return
     */
    List<Map<String,String>> allMessage(Map<String,String> map);

    /**
     * 更新用户信息
     * @param map
     * @return
     */
    Integer updateUserInfo(Map<String,String> map);

    /**
     * 删除用户信息
     * @param map
     * @return
     */
    Integer delUserInfo(Map<String,String> map);

    /**
     * 更新用户评论信息
     * @param map
     * @return
     */
    Integer updateMessage(Map<String,String> map);

    /**
     * 删除评论信息
     * @param map
     * @return
     */
    Integer delMessage(Map<String,String> map);

    /**
     * 更新旅游套餐信息
     * @param map
     * @return
     */
    Integer updateTravelInfo(Map<String,Object> map);

    /**
     * 插入旅游信息
     * @param map
     * @return
     */
    Integer insertTravelInfo(Map<String,Object> map);

    /**
     * 删除旅游信息
     * @param map
     * @return
     */
    Integer delTravelInfo(Map<String,String> map);

    /**
     * 查询全部的推荐活动表
     * @param map
     * @return
     */
    List<Map<String,String>> queryActpush(Map<String,String> map);

    /**
     * 更新推荐活动信息
     * @param map
     * @return
     */
    Integer updateActpush(Map<String,String> map);

}
