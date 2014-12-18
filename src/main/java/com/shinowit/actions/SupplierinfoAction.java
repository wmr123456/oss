package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.SupplierinfoEntity;
import com.shinowit.serverce.GB2Alpha;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/19.
 */
public class SupplierinfoAction extends ActionSupport {
    private SupplierinfoEntity supp;

    @Resource
    private BaseDao<SupplierinfoEntity> dao;
    private String message;
    private String idList;
    private boolean success;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
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

    public SupplierinfoEntity getSupp() {
        return supp;
    }

    public void setSupp(SupplierinfoEntity supp) {
        this.supp = supp;
    }

    public String supplierinsert() {
        if (supp.getSupplierName() != null && supp.getSupplierName().trim().length() > 0) {
            if (supp.getAddress() != null && supp.getAddress().trim().length() > 0) {
                if (supp.getLinkName() != null && supp.getLinkName().trim().length() > 0) {
                    if (supp.getLinkTel() != null && supp.getLinkTel().trim().length() > 0) {
                        if (supp.getSupplierAb() == null || supp.getSupplierAb().trim().length() == 0) {
                            GB2Alpha obj = new GB2Alpha();
                            supp.setSupplierAb(obj.String2Alpha(supp.getSupplierName()));
                        }
                        dao.insert(supp);
                        setSuccess(true);
                        setMessage("插入成功");
                    }
                }
            }
        } else {
            setMessage("请填写完整信息成功");
            setSuccess(false);
        }
        return SUCCESS;
    }

    public String supplierDel() {
        String strID[] = idList.split(",");
        String hql = "delete SupplierinfoEntity where supplierId = ?";
        boolean err = dao.executeByHql(hql, strID);
        return SUCCESS;
    }

    public String supplieredit() {
        boolean result = dao.update(supp);
        if (result == true) {
            setSuccess(true);
            setMessage("修改成功");
        }
        return SUCCESS;
    }
}
