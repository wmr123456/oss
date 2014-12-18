package com.shinowit.serverce;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

//
///**
// * Created by Administrator on 2014/12/8.
// */
//
//import java.io.UnsupportedEncodingException;
//
//import java.security.MessageDigest;
//
//import java.security.NoSuchAlgorithmException;
///**
// * 32位MD5加密，验证
// * @author liushang
// *
// */
//
//public class MD5 {
//    /**
//     * 将指定的字符串用MD5加密
//     * @param originstr 需要加密的字符串
//     * @return 加密后的字符串
//     */
//
//    public String ecodeByMD5(String originstr){
//
//        String result = null;
//        char hexDigits[] = {//用来将字节转换成 16 进制表示的字符
//                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};
//        if(originstr != null){
//            try {
//                //返回实现指定摘要算法的 MessageDigest 对象
//                MessageDigest md = MessageDigest.getInstance("MD5");
//                //使用utf-8编码将originstr字符串编码并保存到source字节数组
//                byte[] source = originstr.getBytes("utf-8");
//                //使用指定的 byte 数组更新摘要
//                md.update(source);
//                //通过执行诸如填充之类的最终操作完成哈希计算，结果是一个128位的长整数
//                byte[] tmp = md.digest();
//                //用16进制数表示需要32位
//                char[] str = new char[32];
//                for(int i=0,j=0; i < 16; i++){
//                    //j表示转换结果中对应的字符位置
//                    //从第一个字节开始，对 MD5 的每一个字节
//                    //转换成 16 进制字符
//                    byte b = tmp[i];
//                    //取字节中高 4 位的数字转换
//                    //无符号右移运算符>>> ，它总是在左边补0
//                    //0x代表它后面的是十六进制的数字. f转换成十进制就是15
//                    str[j++] = hexDigits[b>>>4 & 0xf];
//                    // 取字节中低 4 位的数字转换
//                    str[j++] = hexDigits[b&0xf];
//                }
//                result = new String(str);//结果转换成字符串用于返回
//            } catch (NoSuchAlgorithmException e) {
//                //当请求特定的加密算法而它在该环境中不可用时抛出此异常
//                e.printStackTrace();
//            } catch (UnsupportedEncodingException e) {
//                //不支持字符编码异常
//                e.printStackTrace();
//            }
//        }
//        return result;
//    }
//    //使用MD5检查密码
//    public boolean checkPWD(String typPWD, String relPWD){
//        if(ecodeByMD5(typPWD).equals(ecodeByMD5(relPWD))){
//            return true;
//        }
//        return false;
//    }
//}
public class MD5 {

    // 全局数组
    private final static String[] strDigits = {"0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"};

    public MD5() {
    }

    // 返回形式为数字跟字符串
    private static String byteToArrayString(byte bByte) {
        int iRet = bByte;
        // System.out.println("iRet="+iRet);
        if (iRet < 0) {
            iRet += 256;
        }
        int iD1 = iRet / 16;
        int iD2 = iRet % 16;
        return strDigits[iD1] + strDigits[iD2];
    }

    // 返回形式只为数字
    private static String byteToNum(byte bByte) {
        int iRet = bByte;
        System.out.println("iRet1=" + iRet);
        if (iRet < 0) {
            iRet += 256;
        }
        return String.valueOf(iRet);
    }

    // 转换字节数组为16进制字串
    private static String byteToString(byte[] bByte) {
        StringBuffer sBuffer = new StringBuffer();
        for (int i = 0; i < bByte.length; i++) {
            sBuffer.append(byteToArrayString(bByte[i]));
        }
        return sBuffer.toString();
    }

    public static String GetMD5Code(String strObj) {
        String resultString = null;
        try {
            resultString = new String(strObj);
            MessageDigest md = MessageDigest.getInstance("MD5");
            // md.digest() 该函数返回值为存放哈希值结果的byte数组
            resultString = byteToString(md.digest(strObj.getBytes()));
        } catch (NoSuchAlgorithmException ex) {
            ex.printStackTrace();
        }
        return resultString;
    }

    public static void main(String[] args) {
        MD5 getMD5 = new MD5();
        System.out.println(getMD5.GetMD5Code("123"));
    }
}