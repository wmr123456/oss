package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.OrderdetailsinfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/25.
 */
public class OrderDetaileInfoAction extends ActionSupport {
    private String orderdt;
    private int page;
    private int limit;
    private int rows;
    private List<OrderdetailsinfoEntity> orderDlist;
    private boolean success;
    @Resource
    private BaseDao<OrderdetailsinfoEntity> orderdDao;

    public String SelectByBillCode() {
        String hql = "from OrderinfoEntity where billCode = ?";
        orderDlist = orderdDao.queryByHql(hql, orderdt);
        rows = orderDlist.size();
        setSuccess(true);
        return SUCCESS;
    }

    public String getOrderdt() {
        return orderdt;
    }

    public void setOrderdt(String orderdt) {
        this.orderdt = orderdt;
    }

    public List<OrderdetailsinfoEntity> getOrderDlist() {
        return orderDlist;
    }

    public void setOrderDlist(List<OrderdetailsinfoEntity> orderDlist) {
        this.orderDlist = orderDlist;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }
}
