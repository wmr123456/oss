package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.OperinfoEntity;
import com.shinowit.serverce.MD5;

import javax.annotation.Resource;
import java.io.Serializable;

/**
 * Created by Administrator on 2014/12/7.
 */
public class OperInfoAction extends ActionSupport {
    private String idList;
    private String message;
    private boolean success;
    private OperinfoEntity oper;
    @Resource
    private BaseDao<OperinfoEntity> operiDao;

    public String operinsertexecute() {
        oper.setStatus(true);
        MD5 md5 = new MD5();
        String pass = md5.GetMD5Code(oper.getPassword());
        oper.setPassword(pass);
        Serializable ser = operiDao.insert(oper);
        if (ser != null) {
            setMessage("插入成功！");
            setSuccess(true);
        } else {
            setSuccess(true);
            setMessage("插入不成功！");
        }
        return SUCCESS;
    }

    public String operdelExecute() {
        String strID[] = idList.split(",");
        boolean err = true;
        try {
            for (int i = 0; i < strID.length; i++) {
                String hql = "update OperinfoEntity set status = 0 where operId = ?";
                operiDao.executeByHql(hql, strID[i]);
            }
        } catch (Exception e) {
            e.printStackTrace();
            err = false;
        }

        if (err == true) {
            setMessage("删除成功！");
            setSuccess(true);
        } else {
            setMessage("删除不成功，请检查！");
            setSuccess(true);
        }
        return SUCCESS;
    }

    public String opereditExecute() {
//        oper.setStatus(true);
        boolean result = operiDao.update(oper);
        if (result == true) {
            setSuccess(true);
            setMessage("更新成功！");
        } else {
            setSuccess(true);
            setMessage("更新不成功，请检查输入的数据");
        }
        return SUCCESS;
    }

    public OperinfoEntity getOper() {
        return oper;
    }

    public void setOper(OperinfoEntity oper) {
        this.oper = oper;
    }

    public String getIdList() {
        return idList;
    }

    public void setIdList(String idList) {
        this.idList = idList;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
