package com.travel.mapper;

/**
 *
 * 对用户（客户，管理员）操作的mapper
 *
 */

import java.util.List;
import java.util.Map;

public interface UserMapper {
    /**
     * 查询单个用户信息
     * @param map
     * @return
     */
    Map<String,Object> queryOneUserInfoByCondition(Map<String,String> map);

    /**
     * 查询多个用户信息
     * @param map
     * @return
     */
    List<Map<String,Object>> queryListUserInfoByCondition(Map<String,String> map);

    /**
     * 查询单个管理员信息
     * @param map
     * @return
     */
    Map<String,Object> queryOneAdminInfoByCondition(Map<String,String> map);

    /**
     * 查询旅游信息
     * @param map
     * @return
     */
    List<Map<String,Object>> queryTravelInfoByCondition(Map<String,String> map);

    /**
     * 插入用户信息
     * @param map
     * @return
     */
    Integer InsertUserInfo(Map<String,Object> map);

    /**
     * 插入用户留言信息
     * @param map
     * @return
     */
    Integer InsertCommentInfo(Map<String,String> map);

    /**
     * 插入评价信息
     * @param map
     * @return
     */
    Integer InsertMessage(Map<String,String> map);

    /**
     * 查询消费过的旅游信息
     * @param map
     * @return
     */
    List<Map<String,Object>> allBuyProduct(Map<String,String> map);

    /**
     * 查询全部的评价信息
     * @param map
     * @return
     */
    List<Map<String,String>> allMessages(Map<String,String> map);

    /**
     * 完成下单操作
     * @param map
     * @return
     */
    Integer insertOrder(Map<String,Object> map);

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