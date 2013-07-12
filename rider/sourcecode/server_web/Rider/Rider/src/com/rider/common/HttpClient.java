/*
 * @(#)$Id: HttpClient.java,v 1.1 2012/11/30 00:44:19 linwei Exp $
 *
 * Copyright (c) 2007 福建新大陆软件工程有限公司 版权所有
 * Newland Co. Ltd. All rights reserved.
 *
 * This software is the confidential and proprietary 
 * information of Newland Co. Ltd. 
 * ("Confidential Information"). You shall not disclose 
 * such Confidential Information and shall use it only
 * in accordance with the terms of the contract agreement 
 * you entered into with Newland Co. Ltd
 */
package com.rider.common;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;

import org.apache.commons.httpclient.methods.PostMethod;
import org.apache.commons.httpclient.methods.StringRequestEntity;
import org.apache.commons.httpclient.methods.multipart.FilePart;
import org.apache.commons.httpclient.methods.multipart.MultipartRequestEntity;
import org.apache.commons.httpclient.methods.multipart.Part;
import org.apache.commons.httpclient.methods.multipart.StringPart;
import org.apache.commons.httpclient.params.HttpMethodParams;
import org.apache.commons.io.IOUtils;

import com.newland.bi.util.exception.BIException;
import com.newland.bi.util.common.Constants;
import com.newland.bi.util.common.StringUtil;

/**
 * BI服务层
 * description: HttpURL连接类，用于发送请求到服务端
 * @author 孔扬
 * @version $Revision: 1.1 $ $Date: 2012/11/30 00:44:19 $ $Author: linwei $<br>
 * history 1.0.0 2007-01-13 created by kongyang<br>
 *         1.0.1 2007-04-11 modified by kongyang<br>
 *         1 修改发送方法，采用commons-httpclient包中的方法，解决可能发送缓存字节问题导致的中文截断问题<br>
 *         1.0.2 2007-04-20 modified by kongyang<br>
 *         1 修改了对发送字符串的encode方法<br>
 *         1.0.3 2007-06-06 modified by kongyang<br>
 *         1 改用getResponseBodyAsStream替换getResponseBodyAsString方法，使得获取的应答流的长度足够<br>
 *         1.0.4 2007-09-10 modified by kongyang<br>
 *         1 对网络的字节流进行压缩后发送<br>
 *         1.0.5 2007-10-11 modified by kongyang<br>
 *         1 判断是否需要压缩字节流后发送，缺省不压缩
 */

public class HttpClient {
    private URL               serverURL = null;
    private String            sUrl      = null;
    private HttpURLConnection httpConn  = null;
    public static String ENCODE = "UTF-8";
    
    /**
     * 构造函数
     * @param url URL地址
     * @throws ServiceException
     */
    public HttpClient(String url) throws BIException {
        try {
            serverURL = new URL(url);
            this.sUrl = url;
        }
        catch (IOException ioe) {
            ioe.printStackTrace();

            throw new BIException(ioe.getMessage());
        }
    }

    /**
     * 发送请求到服务
     * @param reqStr 请求字符串
     * @return String 应答字符串
     * @throws ServiceException
     */
    public String sendServer(String reqStr) throws BIException {
        return sendServer(reqStr, ENCODE);
    }

    /**
     * 带文件上传路径的发送请求
     * @param reqStr
     * @param filepaths
     * @param savepath
     * @return
     * @throws BIException
     */
    public String sendServer(String reqStr, String[] filepaths) throws BIException {
        String ret = null;
        try {
            ret = send(reqStr, filepaths);
        }
        catch (Exception e) {
            e.printStackTrace();
        }

        return ret;
    }

    /**
     * 发送数据到服务上，可设置编码
     * @param data 数据
     * @param enc 编码方式
     * @return String 返回字符串
     * @throws ServiceException
     */
    public String sendServer(String data, String enc) throws BIException {
        /*
         * byte [] b = null;
         * 
         * try { b = URLEncoder.encode(new String(data), enc).getBytes(); }
         * catch (java.io.UnsupportedEncodingException uee) {
         * uee.printStackTrace(); }
         * 
         * return sendServer(b);
         */
        String ret = null;
        try {
            ret = send(data);
        }
        catch (Exception e) {
            e.printStackTrace();
            throw new BIException(e.getMessage());
        }

        return ret;
    }

    /**
     * 发送方法
     * @param data
     * @return
     * @throws IOException
     */
    public String sendNoEncode(String data) throws IOException {
        org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();

        PostMethod method = new PostMethod(this.sUrl);

        method.setRequestEntity(new StringRequestEntity(data, null, ENCODE));
        client.executeMethod(method);
        InputStream stream = method.getResponseBodyAsStream();
        String response = IOUtils.toString(stream);
        method.releaseConnection();
        return response;
    }

    /**
     * 发送方法
     * @param data
     * @return
     * @throws IOException
     */
    public String send(String data) throws IOException {
        org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();
        // String encodeData = URLEncoder.encode(data, ENCODE);
        PostMethod method = new PostMethod(this.sUrl);
        String resp = "";
        //        method.addRequestHeader("accept-encoding", "gzip,deflate");
        if (Constants.IS_COMPRESSED) {
            byte[] compData = StringUtil.zip(data.getBytes());
            String inputData = new sun.misc.BASE64Encoder().encode(compData);
            inputData = URLEncoder.encode(inputData, ENCODE);
            // method.setRequestEntity(new ByteArrayRequestEntity(compData));
            method.setRequestEntity(new StringRequestEntity(inputData, null, ENCODE));
            client.executeMethod(method);

            // String response = method.getResponseBodyAsString( );
            InputStream stream = method.getResponseBodyAsStream();
            // String response = StringUtil.uncompress(stream);
            String response = IOUtils.toString(stream);
            response = URLDecoder.decode(response, ENCODE);
            byte[] respCompByte = new sun.misc.BASE64Decoder().decodeBuffer(response);
            byte[] respByte = StringUtil.unzip(respCompByte);
            // String resp = URLDecoder.decode(new String(respByte), ENCODE);
            resp = new String(respByte);
            method.releaseConnection();
        }
        else {
            method.setRequestEntity(new StringRequestEntity(data, null, ENCODE));
            client.executeMethod(method);

            //method.addRequestHeader(header)
            InputStream stream = method.getResponseBodyAsStream();
            resp = IOUtils.toString(stream,ENCODE);
            method.releaseConnection();
        }
        return resp;
    }

    /**
     * 发送方法(带multipart)
     * @param savepath 
     * @param data,inputStream
     * @return
     * @throws IOException
     */
    public String send(String data, String[] filePath) throws IOException {
        org.apache.commons.httpclient.HttpClient client = new org.apache.commons.httpclient.HttpClient();
        //String encodeData = URLEncoder.encode(data, ENCODE);
        System.out.println("=====================文件上传start" + ":" + filePath.length + "=====================");
        PostMethod method = new PostMethod(this.sUrl);
        File[] aFile = new File[filePath.length];
        String resp = "";

        if (Constants.IS_COMPRESSED) {
            // 如果应答是压缩的，则不判断是否有multipart
            byte[] compData = StringUtil.zip(data.getBytes());
            String inputData = new sun.misc.BASE64Encoder().encode(compData);
            inputData = URLEncoder.encode(inputData, ENCODE);
            // method.setRequestEntity(new ByteArrayRequestEntity(compData));
            method.addParameter("reqdata", inputData);
            Part[] parts = new Part[filePath.length + 2];
            for (int i = 0; i < filePath.length; i++) {
                aFile[i] = new File(filePath[i]);
                System.out.println("=====================压缩文件上传" + i + ":" + filePath[i] + "=====================");
                parts[i] = new FilePart(aFile[i].getName(), aFile[i]);
            }
            parts[filePath.length] = new StringPart("reqdata", inputData, ENCODE);
            //parts[filePath.length + 1] = new StringPart("path", savepath, ENCODE);
            method.setRequestEntity(new MultipartRequestEntity(parts, method.getParams()));
            client.executeMethod(method);

            InputStream stream = method.getResponseBodyAsStream();

            String response = IOUtils.toString(stream);
            response = URLDecoder.decode(response, ENCODE);
            byte[] respCompByte = new sun.misc.BASE64Decoder().decodeBuffer(response);
            byte[] respByte = StringUtil.unzip(respCompByte);
            resp = new String(respByte);
            method.releaseConnection();
        }
        else {
            HttpMethodParams params = new HttpMethodParams();
            //data = URLEncoder.encode(data, ENCODE);

            params.setParameter("reqdata", data);
            method.setParams(params);
            Part[] parts = new Part[filePath.length + 2];
            for (int i = 0; i < filePath.length; i++) {
                aFile[i] = new File(filePath[i]);
                System.out.println("=====================不压缩文件上传" + i + ":" + filePath[i] + "=====================");
                parts[i] = new FilePart(aFile[i].getName(), aFile[i]);

            }
            parts[filePath.length] = new StringPart("reqdata", data, ENCODE);
            //            parts[filePath.length + 1] = new StringPart("path", savepath, ENCODE);
            method.setRequestEntity(new MultipartRequestEntity(parts, method.getParams()));
            System.out.println("=====================表单数据" + method.getParams().getParameter("reqdata")
                    + "=====================");
            client.executeMethod(method);
            InputStream stream = method.getResponseBodyAsStream();
            resp = IOUtils.toString(stream);
            method.releaseConnection();
        }
        return resp;
    }

    /**
     * 打开连接
     * @return boolean
     */
    public boolean openConnection() {
        boolean b = true;

        try {
            httpConn = (HttpURLConnection) serverURL.openConnection(); // 打开一个URL连接
        }
        catch (IOException ioe) {
            ioe.printStackTrace();
            b = false;
        }

        return b;
    }

    /**
     * 向服务发送请求，二进制，返回字符串
     * @param reqData byte[]
     * @return String
     */
    public String sendServer(byte[] reqData) throws BIException {
        StringBuffer responseSb = null;

        try {
            if (httpConn == null) {
                openConnection();
            }

            System.out.println(httpConn);

            httpConn.setDoOutput(true); // 设置可向服务器写入请求数据
            httpConn.setDoInput(true); // 设置可向服务器读入响应数据
            // httpConn.connect();

            httpConn.setRequestMethod("POST"); // 设置请求方式为POST
            // 设置请求的类型
            httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
            httpConn.setRequestProperty("Content-Type", "text/xml");
            // 设置请求长度
            httpConn.setRequestProperty("Content-Length", String.valueOf(reqData.length));
            OutputStream out = httpConn.getOutputStream(); // 打开服务器的输出流
            out.write(reqData); // 向服务器写出请求的具体内容
            out.flush(); // 刷新缓冲
            out.close(); // 关闭输出流
            // 得到响应的输入流
            BufferedInputStream bis = new BufferedInputStream(httpConn.getInputStream());
            // 初始化数组
            byte[] b = new byte[1024]; // 存放POST请求回来的数据
            int i = 0;
            // int byteCount = 0;
            responseSb = new StringBuffer();

            while ((i = bis.read(b, 0, 1024)) != -1) {
                responseSb.append(new String(b, 0, i));
            }

            bis.close(); // 关闭输入流
        }
        catch (IOException ioe) {
            ioe.printStackTrace();

            throw new BIException("连接失败原因:可能服务器已关闭" + ioe.getMessage());
        }
        catch (Exception e2) {
            throw new BIException("发送失败原因:可能服务器已关闭" + e2.getMessage());
        }
        finally {
            httpConn.disconnect(); // 送闭HTTP连接
        }

        return responseSb.toString();
    }
}