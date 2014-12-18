package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.DeliveryinfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/20.
 */
public class DeliveryInfoAction extends ActionSupport {
    private List<DeliveryinfoEntity> deliveryinfoEntitylist;
    private String message;
    private boolean success;
    private DeliveryinfoEntity delivery;
    private String idList;
    @Resource
    private BaseDao<DeliveryinfoEntity> deliverydao;

    public String delieryInsert() {
        if (delivery.getLinkTel() != null && delivery.getLinkTel().trim().length() > 0) {
            if (delivery.getLinkName() != null && delivery.getLinkName().trim().length() > 0) {
                if (delivery.getAddress() != null && delivery.getAddress().trim().length() > 0) {
                    if (delivery.getDeliveryName() != null && delivery.getDeliveryName().trim().length() > 0) {
                        if (delivery.getEmail() != null && delivery.getEmail().trim().length() > 0) {
                            delivery.setStatus(true);
                            deliverydao.insert(delivery);
                            setSuccess(true);
                            setMessage("插入成功");
                        }
                    }
                }
            }
        } else {
            setSuccess(true);
            setMessage("请输入正确的信息");
        }
        return SUCCESS;
    }

    public String deliveryDel() {
        String strID[] = idList.split(",");
        String hql = "delete DeliveryinfoEntity where deliveryId = ?";
        boolean err = deliverydao.executeByHql(hql, strID);
        return SUCCESS;
    }

    public String deliveryEdit() {
        boolean result = deliverydao.update(delivery);
        if (result == true) {
            setSuccess(true);
            setMessage("修改成功");
        } else {
            setSuccess(true);
            setMessage("修改不成功，请检查输入信息");
        }
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

    public DeliveryinfoEntity getDelivery() {
        return delivery;
    }

    public void setDelivery(DeliveryinfoEntity delivery) {
        this.delivery = delivery;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public List<DeliveryinfoEntity> getDeliveryinfoEntitylist() {
        return deliveryinfoEntitylist;
    }

    public void setDeliveryinfoEntitylist(List<DeliveryinfoEntity> deliveryinfoEntitylist) {
        this.deliveryinfoEntitylist = deliveryinfoEntitylist;
    }


}
