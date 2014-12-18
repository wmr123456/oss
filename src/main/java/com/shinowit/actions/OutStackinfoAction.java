package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.OutstockdetailsinfoEntity;
import com.shinowit.entity.OutstockinfoEntity;
import com.shinowit.entity.StockinfoEntity;
import com.shinowit.serverce.OutStackInfoActionServer;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/12/3.
 */
public class OutStackinfoAction extends ActionSupport {

    private String message;
    private boolean success;
    private String idList;
    private List<OutstockdetailsinfoEntity> outStackList;
    private OutstockinfoEntity outStack;
    @Resource
    private BaseDao<OutstockinfoEntity> outStackDao;
    @Resource
    private BaseDao<OutstockdetailsinfoEntity> outStackDDao;
    @Resource
    private BaseDao<StockinfoEntity> stockDao;

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

    public List<OutstockdetailsinfoEntity> getOutStackList() {
        return outStackList;
    }

    public void setOutStackList(List<OutstockdetailsinfoEntity> outStackList) {
        this.outStackList = outStackList;
    }

    public OutstockinfoEntity getOutStack() {
        return outStack;
    }

    public void setOutStack(OutstockinfoEntity outStack) {
        this.outStack = outStack;
    }

    public String outStackInsertExecute() {
        OutStackInfoActionServer outStackExecute = new OutStackInfoActionServer();
        boolean result = outStackExecute.outStackActionServer(outStackDao, outStackDDao, stockDao, outStack, outStackList);
        if (result) {
            setMessage("出库成功！");
            setSuccess(true);
        } else {
            setMessage("出库不成功！");
            setSuccess(true);
        }
        return SUCCESS;
    }

    public String ooutStackDelExecute() {
        String strID[] = idList.split(",");
        OutStackInfoActionServer serverce = new OutStackInfoActionServer();
        boolean err = serverce.delExecute(outStackDao, outStackDDao, stockDao, strID);
        if (err == true) {
            setMessage("删除成功！");
            setSuccess(true);
        } else {
            setMessage("删除不成功，请检查！");
            setSuccess(true);
        }
        return SUCCESS;
    }

    public String outStackEditExecute() {
        OutStackInfoActionServer outStackInfoActionServer = new OutStackInfoActionServer();
        boolean result = outStackInfoActionServer.outStackEditExecute(outStackDao, outStackDDao, stockDao, outStack, outStackList);
        if (result) {
            setSuccess(true);
            setMessage("修改成功！");
        } else {
            setMessage("修改不成功！");
            setSuccess(true);
        }
        return SUCCESS;
    }
}
