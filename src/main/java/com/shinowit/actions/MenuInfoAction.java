package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.MenuDao;
import com.shinowit.entity.TreeNode;
import org.apache.struts2.ServletActionContext;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by Administrator on 2014/11/14.
 */
public class MenuInfoAction extends ActionSupport {
    private TreeNode menulist;
    @Resource
    private MenuDao menuDao;
    private String roleId;

    public String execute() {
        HttpServletRequest request = ServletActionContext.getRequest();
        HttpSession session = request.getSession(false);
        List<Object> list1 = (List<Object>) session.getAttribute("user");
        String roleId = (String) list1.get(1);
        menulist = menuDao.queryModule(roleId);
        return SUCCESS;
    }

    public String treeExecute() {
        menulist = menuDao.queryModule(roleId);
        return SUCCESS;
    }

    public String menuAllTree() {
        menulist = menuDao.queryMenu();
        return SUCCESS;
    }

    public TreeNode getMenulist() {
        return menulist;
    }

    public void setMenulist(TreeNode menulist) {
        this.menulist = menulist;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
