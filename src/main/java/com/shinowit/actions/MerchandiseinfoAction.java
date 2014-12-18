package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.MerchandiseinfoEntity;
import com.shinowit.serverce.GB2Alpha;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/11/24.
 */
public class MerchandiseinfoAction extends ActionSupport {
    private MerchandiseinfoEntity mecd;
    private String idList;
    private String message;
    private boolean success;
    @Resource
    private BaseDao<MerchandiseinfoEntity> mecdDao;

    public MerchandiseinfoEntity getMecd() {
        return mecd;
    }

    public void setMecd(MerchandiseinfoEntity mecd) {
        this.mecd = mecd;
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

    public String merchandiseInsert() {
        if (mecd.getMerchandiseName() != null && mecd.getMerchandiseName().trim().length() > 0) {
            if (mecd.getMerchandiseAb() == null || mecd.getMerchandiseAb().trim().length() == 0) {
                GB2Alpha zjm = new GB2Alpha();
                mecd.setMerchandiseAb(zjm.String2Alpha(mecd.getMerchandiseName()));
            }
            mecdDao.insert(mecd);
            setMessage("插入成功");
            setSuccess(true);
        } else {
            setMessage("请输入合法的信息");
            setSuccess(true);
        }
        return SUCCESS;
    }

    public String merchandiseDel() {
        String strID[] = idList.split(",");
        String hql = "delete from MerchandiseinfoEntity where merchandiseId = ?";
        mecdDao.executeByHql(hql, strID);
        return SUCCESS;
    }

    public String merchandiseEdit() {
        boolean result = mecdDao.update(mecd);
        if (result == true) {
            setSuccess(true);
            setMessage("修改成功");
        }
        return SUCCESS;
    }
}
