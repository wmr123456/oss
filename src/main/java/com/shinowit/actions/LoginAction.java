package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.OperinfoEntity;
import com.shinowit.serverce.MD5;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-11-10.
 */
public class LoginAction extends ActionSupport {
    private org.apache.log4j.Logger logger = org.apache.log4j.Logger.getLogger(getClass());
    private OperinfoEntity oper;
    private boolean have;
    private String message;
    private boolean success;
    private List<OperinfoEntity> list;


    @Resource
    private BaseDao<OperinfoEntity> dao;

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean seccess) {
        this.success = seccess;
    }

    public OperinfoEntity getOper() {
        return oper;
    }

    public void setOper(OperinfoEntity oper) {
        this.oper = oper;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isHave() {
        return have;
    }

    public void setHave(boolean have) {
        this.have = have;
    }

    public List<OperinfoEntity> getList() {
        return list;
    }

    public void setList(List<OperinfoEntity> list) {
        this.list = list;
    }

    public String myLogin() {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession session = request.getSession(false);
        String code = (String) session.getAttribute("rand");
        String codeForJs = request.getParameter("validcode");
        if (code.equals(codeForJs)) {
            if ((oper.getOperName().trim().length() != 0) && (oper.getOperName() != null)) {
                MD5 md5 = new MD5();
                String pass = md5.GetMD5Code(oper.getPassword());
                oper.setPassword(pass);
                String hql = "from OperinfoEntity where operName = ? and password = ? and status = 1";
                Object[] objects = {oper.getOperName(), oper.getPassword()};
                setList(dao.queryByHql(hql, objects));
                List<Object> listuser = new ArrayList<Object>();
                if (list.size() == 1) {
                    OperinfoEntity user = list.get(0);
                    listuser.add(user.getOperName());
                    listuser.add(user.getRoleinfoByRoleId().getRoleId());
                    listuser.add(user.getRoleinfoByRoleId().getRoleName());
                    setSuccess(true);
                    setMessage("登录成功！");
                    setHave(true);
                    setUserSession(listuser);//设置登陆用户的session
                    return SUCCESS;
                } else {
                    setSuccess(true);
                    setMessage("用户名或密码不正确，请检查！");
                    setHave(false);
                    return SUCCESS;
                }
            }
        }

        setSuccess(true);
        setMessage("验证码不正确");
        setHave(false);
        return SUCCESS;
    }

    //设置登陆用户的session
    private void setUserSession(List<Object> list) {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession session = request.getSession();
        request.getSession(true).setAttribute("user", list);
    }

    //取得登陆用户的session
    public String userSession() {
        setSuccess(true);
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession session = request.getSession(false);
        setList((List) session.getAttribute("user"));
        return "ok";
    }

    //跳转单主界面对应struts2里的log
    public String execute() {
        return "ok";
    }

    public String logout() {
        return "ok";
    }
}
