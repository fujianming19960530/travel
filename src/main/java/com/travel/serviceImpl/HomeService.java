package com.travel.serviceImpl;

import com.travel.core.Const;
import com.travel.core.ResponseResult;
import com.travel.mapper.UserMapper;
import com.travel.service.HomeServiceInterface;
import com.travel.util.CacheManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class HomeService implements HomeServiceInterface{

    @Autowired
    private UserMapper userMapper;

    @Override
    public ResponseResult userLogin(Map<String, String> map) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        //组装用户请求信息
        Map<String,String> userInfo = new HashMap<>();
        userInfo.put("account",map.get("account"));
        //根据用户编号查询数据库用户信息（单个用户）
        Map<String,Object> responseMap = userMapper.queryOneUserInfoByCondition(userInfo);
        if(responseMap == null){
            //查询一下是否是管理员
            responseMap = userMapper.queryOneAdminInfoByCondition(userInfo);
        }
        //未查询到用户
        if(responseMap == null){
            //用户名或密码错误(用户不存在)
            result.setRes_code(Const.login.LOGIN_MESSAGE_CODE_004.getCode());
            return result;
        }else {
            //用户存在，匹配用户密码
            if(!map.get("password").equals(responseMap.get("password"))){
                //密码不匹配
                result.setRes_code(Const.login.LOGIN_MESSAGE_CODE_004.getCode());
                return result;
            }else {
                //用户存在，密码匹配成功，校验验证码是否正确
                CacheManagerImpl cacheManagerImpl = new CacheManagerImpl();
                String code = cacheManagerImpl.getCacheByKey("RANDOMCODEKEY").getDatas().toString();
                //验证码校验成功
                if(code.equals(map.get("code"))){
                    //用户存在，密码匹配成功，判断权限，00为普通用户，01为管理员，02为超级管理员
                    if(("00").equals(responseMap.get("role_level"))){
                        result.setRes_code(Const.login.LOGIN_MESSAGE_CODE_1000.getCode());
                    }if(("01").equals(responseMap.get("role_level"))){
                        result.setRes_code(Const.login.LOGIN_MESSAGE_CODE_2000.getCode());
                    }if(("02").equals(responseMap.get("role_level"))){
                        result.setRes_code(Const.login.LOGIN_MESSAGE_CODE_3000.getCode());
                    }
                    //登录成功保存用户信息在缓存
                    cacheManagerImpl.putCache("userInfo",responseMap,7200000);
                    return result;
                }else {
                    //验证码校验失败
                    result.setRes_code(Const.login.LOGIN_MESSAGE_CODE_005.getCode());
                    return result;
                }
            }
        }
    }

    @Override
    public ResponseResult travelHotInfo(Map<String, String> map) {
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        map.put("hotInfo","hot");
        result.setResult(userMapper.queryTravelInfoByCondition(map));
        return result;
    }

    @Override
    public ResponseResult travelNewInfo(Map<String, String> map) {
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        map.put("newInfo","new");
        result.setResult(userMapper.queryTravelInfoByCondition(map));
        return result;
    }

    @Override
    public ResponseResult travelInfo(Map<String, String> map) {
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        result.setResult(userMapper.queryTravelInfoByCondition(map));
        return result;
    }

    @Override
    public ResponseResult Registertion(Map<String, Object> map) {
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        //设置初始权限和初始积分
        map.put("role_level","00");
        map.put("signin_date","2019年");
        map.put("vip_level","1");
        map.put("integral",0);
        Map<String,String> request = new HashMap<>();
        request.put("account",map.get("account").toString());
        //检查用户账号是否已使用
        Map<String,Object> userInfo = userMapper.queryOneUserInfoByCondition(request);
        if(userInfo == null){
            userMapper.InsertUserInfo(map);
            result.setRes_code(Const.CODE_INFO.CODE_0000.getCode());
            return result;
        }
        else {
            result.setRes_code(Const.CODE_INFO.CODE_0004.getCode());
            return result;
        }
    }

    @Override
    public ResponseResult addComment(Map<String, String> map) {
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        CacheManagerImpl cacheManagerImpl = new CacheManagerImpl();
        Object userInfo = cacheManagerImpl.getCacheDataByKey("userInfo");
        map.put("comment_userId",((HashMap) userInfo).get("account").toString());
        userMapper.InsertCommentInfo(map);
        return result;
    }

    @Override
    public ResponseResult allByProducts(Map<String, String> map) {
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        CacheManagerImpl cacheManagerImpl = new CacheManagerImpl();
        Object userInfo = cacheManagerImpl.getCacheDataByKey("userInfo");
        map.put("account",((HashMap) userInfo).get("account").toString());
        result.setResult(userMapper.allBuyProduct(map));
        return result;
    }

    @Override
    public ResponseResult addMessage(Map<String, String> map) {
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        CacheManagerImpl cacheManagerImpl = new CacheManagerImpl();
        Object userInfo = cacheManagerImpl.getCacheDataByKey("userInfo");
        map.put("account",((HashMap) userInfo).get("account").toString());
        userMapper.InsertMessage(map);
        return result;
    }

    @Override
    public ResponseResult allMessages(Map<String, String> map) {
        ResponseResult result = new ResponseResult(Const.CODE_INFO.CODE_0000);
        if(map.containsKey("account")){
            CacheManagerImpl cacheManagerImpl = new CacheManagerImpl();
            Object userInfo = cacheManagerImpl.getCacheDataByKey("userInfo");
            map.put("account",((HashMap) userInfo).get("account").toString());
            userMapper.InsertMessage(map);
        }
        result.setResult(userMapper.allMessages(map));
        return result;
    }

    @Override
    public Integer addProd(Map<String, Object> map) {
        //map.put("number",100);
        CacheManagerImpl cacheManagerImpl = new CacheManagerImpl();
        Object userInfo = cacheManagerImpl.getCacheDataByKey("userInfo");
        map.put("account",((HashMap) userInfo).get("account").toString());
        double price = Double.valueOf(map.get("price").toString());
        map.put("number",price);
        userMapper.insertOrder(map);
        return null;
    }

    @Override
    public List<Map<String, Object>> queryUserInfo(Map<String, String> map) {
        return userMapper.queryListUserInfoByCondition(map);
    }

    @Override
    public List<Map<String, Object>> queryPayInfo(Map<String, String> map) {
        return userMapper.allBuyProduct(map);
    }

    @Override
    public List<Map<String, String>> allMessage(Map<String, String> map) {
        return userMapper.allMessages(map);
    }

    @Override
    public Integer updateUserInfo(Map<String, String> map) {
        userMapper.updateUserInfo(map);
        return 0;
    }

    @Override
    public Integer delUserInfo(Map<String, String> map) {
        userMapper.delUserInfo(map);
        return 0;
    }

    @Override
    public Integer updateMessage(Map<String, String> map) {
        CacheManagerImpl cacheManagerImpl = new CacheManagerImpl();
        Object userInfo = cacheManagerImpl.getCacheDataByKey("userInfo");
        map.put("admin_name",((HashMap) userInfo).get("sys_name").toString());
        userMapper.updateMessage(map);
        return 0;
    }

    @Override
    public Integer delMessage(Map<String, String> map) {
        userMapper.delMessage(map);
        return 0;
    }

    @Override
    public Integer updateTravelInfo(Map<String, Object> map) {
        userMapper.updateTravelInfo(map);
        return 0;
    }

    @Override
    public Integer insertTravelInfo(Map<String, Object> map) {
        map.put("travel_type","01");
        map.put("travel_Byno",0);
        //detail_picture.toString();
        userMapper.insertTravelInfo(map);
        return 0;
    }

    @Override
    public Integer delTravelInfo(Map<String, String> map) {
        userMapper.delTravelInfo(map);
        return 0;
    }

    @Override
    public List<Map<String, String>> queryActpush(Map<String, String> map) {
        return userMapper.queryActpush(map);
    }

    @Override
    public Integer updateActpush(Map<String, String> map) {
        userMapper.updateActpush(map);
        return 0;
    }
}
