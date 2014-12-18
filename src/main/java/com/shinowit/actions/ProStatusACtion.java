package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.ProstatusinfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/20.
 */
public class ProStatusACtion extends ActionSupport {
    private List<ProstatusinfoEntity> proStauslist;
    private ProstatusinfoEntity pros;
    private String idList;
    private String message;
    private boolean success;
    @Resource
    private BaseDao<ProstatusinfoEntity> proStatusdao;

    public String proStatusInsert() {
        if (pros.getProStatusName() != null && pros.getProStatusName().trim().length() > 0) {
            proStatusdao.insert(pros);
            setMessage("插入成功");
            setSuccess(true);
        }
        return SUCCESS;
    }

    public String proStatusDel() {
        String strID[] = idList.split(",");
        String hql = "delete from ProstatusinfoEntity where proStatusId = ?";
        proStatusdao.executeByHql(hql, strID);
        return SUCCESS;
    }

    public String proStatusEdit() {
        boolean result = proStatusdao.update(pros);
        if (result == true) {
            setSuccess(true);
            setMessage("修改成功");
        }
        return SUCCESS;
    }

    public String getIdList() {
        return idList;
    }

    public void setIdList(String idList) {
        this.idList = idList;
    }

    public ProstatusinfoEntity getPros() {
        return pros;
    }

    public void setPros(ProstatusinfoEntity pros) {
        this.pros = pros;
    }

    public List<ProstatusinfoEntity> getProStauslist() {
        return proStauslist;
    }

    public void setProStauslist(List<ProstatusinfoEntity> proStauslist) {
        this.proStauslist = proStauslist;
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
