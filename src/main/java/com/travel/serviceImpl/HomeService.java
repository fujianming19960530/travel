package com.travel.serviceImpl;

import com.travel.core.Const;
import com.travel.core.ResponseResult;
import com.travel.mapper.UserMapper;
import com.travel.service.HomeServiceInterface;
import com.travel.util.CacheManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
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
}