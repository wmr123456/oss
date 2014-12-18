package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.InstockdetailsinfoEntity;
import com.shinowit.entity.InstockinfoEntity;
import com.shinowit.entity.StockinfoEntity;
import com.shinowit.serverce.InstockInsertServerce;
import org.hibernate.SessionFactory;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/30.
 */
public class InstockInfoAction extends ActionSupport {
    @Resource
    protected SessionFactory sessionFactory;
    private String message;
    private boolean success;
    private String idList;
    private List<InstockdetailsinfoEntity> instockDlist;
    private List<InstockinfoEntity> instockList;
    private InstockinfoEntity instock;
    private InstockinfoEntity instockEdit;
    @Resource
    private BaseDao<InstockinfoEntity> instockDao;
    @Resource
    private BaseDao<InstockdetailsinfoEntity> instockDDao;
    @Resource
    private BaseDao<StockinfoEntity> stockDDao;

    public String instockInsertExecute() {
        InstockInsertServerce serverce = new InstockInsertServerce();
        boolean result = serverce.inertExecute(instockDao, instockDDao, stockDDao, instockDlist, instock);
        if (result == true) {
            setSuccess(true);
            setMessage("插入成功");
        } else {
            setSuccess(true);
            setMessage("插入不成功请检查填写的数据");
        }
        return SUCCESS;
    }

    public String instockDelExcute() {
        String strID[] = idList.split(",");
        InstockInsertServerce serverce = new InstockInsertServerce();
        boolean err = serverce.delExecute(instockDao, instockDDao, stockDDao, strID);
        if (err == true) {
            setMessage("删除成功！");
            setSuccess(true);
        } else {
            setMessage("删除不成功，请检查！");
            setSuccess(true);
        }
        return SUCCESS;
    }

    public String instockeditExecute() {
//        Session session = null;
//        session = sessionFactory.getCurrentSession();
//        session.merge();
        InstockInsertServerce server = new InstockInsertServerce();
        boolean result = server.editExecute(instockDao, instockDDao, stockDDao, instockEdit, instockDlist);
//        instockDao.update(instockEdit);
        if (result) {
            setMessage("修改成功！");
            setSuccess(true);
        } else {
            setMessage("修改不成功！");
            setSuccess(true);
        }
        return SUCCESS;
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

    public List<InstockdetailsinfoEntity> getInstockDlist() {
        return instockDlist;
    }

    public void setInstockDlist(List<InstockdetailsinfoEntity> instockDlist) {
        this.instockDlist = instockDlist;
    }

    public List<InstockinfoEntity> getInstockList() {
        return instockList;
    }

    public void setInstockList(List<InstockinfoEntity> instockList) {
        this.instockList = instockList;
    }

    public InstockinfoEntity getInstock() {
        return instock;
    }

    public void setInstock(InstockinfoEntity instock) {
        this.instock = instock;
    }

    public InstockinfoEntity getInstockEdit() {
        return instockEdit;
    }

    public void setInstockEdit(InstockinfoEntity instockEdit) {
        this.instockEdit = instockEdit;
    }
}
