package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.OperinfoEntity;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/13.
 */
public class JsonTest extends ActionSupport {
    private OperinfoEntity oper;
    private List<OperinfoEntity> list;
    @Resource
    private BaseDao<OperinfoEntity> dao;

    public String execute() {
        String sql = "from OperinfoEntity where operName = ? and password = ?";
        Object[] objects = {"admin", "123"};
        list = dao.queryByHql(sql, objects);
        return "ok";
    }

    public OperinfoEntity getOper() {
        return oper;
    }

    public void setOper(OperinfoEntity oper) {
        this.oper = oper;
    }

    public List<OperinfoEntity> getList() {
        return list;
    }

    public void setList(List<OperinfoEntity> list) {
        this.list = list;
    }

}
