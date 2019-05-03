package com.travel.controller;


import com.travel.core.Const;
import com.travel.core.ResponseResult;
import com.travel.service.HomeServiceInterface;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@Controller
@RequestMapping("/adminController")
public class adminController {

    @Autowired
    private HomeServiceInterface homeServiceInterface;

    @RequestMapping("/queryUserInfo")
    @ResponseBody
    public ResponseResult queryUserInfo(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        result.setResult(homeServiceInterface.queryUserInfo(request));
        return result;
    }

    @RequestMapping("/allPayInfo")
    @ResponseBody
    public ResponseResult allPayInfo(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        result.setResult(homeServiceInterface.queryPayInfo(request));
        return result;
    }

    @RequestMapping("/allMessages")
    @ResponseBody
    public ResponseResult allMessages(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        result.setResult(homeServiceInterface.allMessage(request));
        return result;
    }

    @RequestMapping("/updateUserInfo")
    @ResponseBody
    public ResponseResult updateUserInfo(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        homeServiceInterface.updateUserInfo(request);
        return result;
    }

    @RequestMapping("/delUserInfo")
    @ResponseBody
    public ResponseResult delUserInfo(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        homeServiceInterface.delUserInfo(request);
        return result;
    }

    @RequestMapping("/updateMessage")
    @ResponseBody
    public ResponseResult updateMessage(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        homeServiceInterface.updateMessage(request);
        return result;
    }

    @RequestMapping("/updateTravelInfo")
    @ResponseBody
    public ResponseResult updateTravelInfo(@RequestBody Map<String, Object> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        homeServiceInterface.updateTravelInfo(request);
        return result;
    }

    @RequestMapping("/insertTravelInfo")
    @ResponseBody
    public ResponseResult delMessage(@RequestBody Map<String, Object> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        homeServiceInterface.insertTravelInfo(request);
        return result;
    }

    @RequestMapping("/delTravelInfo")
    @ResponseBody
    public ResponseResult delTravelInfo(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        homeServiceInterface.delTravelInfo(request);
        return result;
    }

    /**
     * * 单个文件上传
     * * @param request
     * * @return
     */
    @RequestMapping(value = "/upload2", produces = "text/html;charset=utf-8")
    @ResponseBody
    private ResponseResult upload2(@RequestParam("file") CommonsMultipartFile partFile, HttpServletRequest request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        try {
            /*String path = request.getServletContext().getRealPath("/upload");*/
            String path = "F:\\project\\travel\\src\\main\\webapp\\travel\\index\\img\\";
            String name = request.getParameter("name");
            System.out.println("其他的参数{}:" + name);
            System.out.println("upload2---------------start---------------------");
            System.out.println("这个临时文件的路径是[{}]" + path);
            String filename = partFile.getOriginalFilename();
            System.out.println("文件的名字：{}" + filename);
            File file = new File(path + "/" + filename);
            file.createNewFile();
            InputStream inputStream = partFile.getInputStream();
            FileUtils.copyInputStreamToFile(inputStream, file);
            if (inputStream != null) {
                inputStream.close();
            }
            //result.setRes_code(Const.CODE_INFO.CODE_0004.getCode());
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            result.setRes_code(Const.CODE_INFO.CODE_0004.getCode());
            return result;
        }
    }

    @RequestMapping(value = "upload", method = RequestMethod.POST)
    public String upload(@RequestParam("file") MultipartFile[] files) {//支持多个文件的上传
        //实例化一个文件存放的目录地址
        String dir = "F:/project/travel/src/main/webapp/travel/index/img/";
        /*String p = "F:\\project\\travel\\src\\main\\webapp\\travel\\index\\img\\"*/
        for (MultipartFile file : files) {
            System.out.println("文件类型:" + file.getContentType());
            String filename = file.getOriginalFilename();
            String suffix = filename.substring(filename.length() - 3);
            System.out.println("文件名:" + filename);
            System.out.println("文件后缀:" + suffix);
            System.out.println("文件大小:" + file.getSize() / 1024 + "KB");
            //创建要保存文件的路径
            File dirFile = new File(dir, filename);
            if (!dirFile.exists()) {
                dirFile.mkdirs();
            }
            try {
                //将文件写入创建的路径
                file.transferTo(dirFile);
                System.out.println("文件保存成功~");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return "OK";
    }

    @RequestMapping("/queryActpush")
    @ResponseBody
    public ResponseResult queryActpush(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        result.setResult(homeServiceInterface.queryActpush(request));
        return result;
    }

    @RequestMapping("/updateActpush")
    @ResponseBody
    public ResponseResult updateActpush(@RequestBody Map<String, String> request) {
        ResponseResult result = new ResponseResult(Const.login.LOGIN_MESSAGE_CODE_1000);
        homeServiceInterface.updateActpush(request);
        return result;
    }

}
