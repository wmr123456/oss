package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.LoginfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/20.
 */
public class LogInfoAction extends ActionSupport {
    private String idList;
    private String message;
    private boolean success;
    private List<LoginfoEntity> logList;
    @Resource
    private BaseDao<LoginfoEntity> loginfoDao;

    public String loginfoDel() {
        String strID[] = idList.split(",");
        String hql = "delete LoginfoEntity where id = ?";
        loginfoDao.executeByHql(hql, strID);
        setSuccess(true);
        setMessage("删除成功");
        return SUCCESS;
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

    public List<LoginfoEntity> getLogList() {
        return logList;
    }

    public void setLogList(List<LoginfoEntity> logList) {
        this.logList = logList;
    }
}
