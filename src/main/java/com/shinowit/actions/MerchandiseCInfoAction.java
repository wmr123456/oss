package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.MerchandisecinfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/17.
 */
public class MerchandiseCInfoAction extends ActionSupport {
    private List<MerchandiseCInfoAction> merchandiseCInfoActionList;
    private String idList;      //del()方法接收的MerchandisecinfoEntity实体类的主键字符串集合
    private MerchandisecinfoEntity mchdc;
    private String message;
    private boolean success;
    private List<MerchandisecinfoEntity> selectlist;
    @Resource
    private BaseDao<MerchandisecinfoEntity> dao;

    public List<MerchandiseCInfoAction> getMerchandiseCInfoActionList() {
        return merchandiseCInfoActionList;
    }

    public void setMerchandiseCInfoActionList(List<MerchandiseCInfoAction> merchandiseCInfoActionList) {
        this.merchandiseCInfoActionList = merchandiseCInfoActionList;
    }

    public MerchandisecinfoEntity getMchdc() {
        return mchdc;
    }

    public void setMchdc(MerchandisecinfoEntity mchdc) {
        this.mchdc = mchdc;
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

    public String getIdList() {
        return idList;
    }

    public void setIdList(String idList) {
        this.idList = idList;
    }

    public List<MerchandisecinfoEntity> getSelectlist() {
        return selectlist;
    }

    public void setSelectlist(List<MerchandisecinfoEntity> selectlist) {
        this.selectlist = selectlist;
    }

    public String insert() {
        if ((mchdc.getMerchandiseCName() != null && mchdc.getMerchandiseCName().trim().length() != 0)) {
            if (mchdc.getStatus() != null && (mchdc.getStatus() == false || mchdc.getStatus() == true)) {
                dao.insert(mchdc);
                setSuccess(true);
                setMessage("插入成功");
            } else {
                setMessage("执行不成功");
                setSuccess(true);
            }
        }
        return SUCCESS;
    }

    public String del() {
        String strID[] = idList.split(",");
        String hql = "delete MerchandisecinfoEntity where merchandiseCid = ?";
        boolean err = dao.executeByHql(hql, strID);
        return SUCCESS;
    }

    public String edit() {
        boolean result = dao.update(mchdc);
        if (result == true) {
            setSuccess(true);
            setMessage("修改成功");
        }
        return SUCCESS;
    }
}
