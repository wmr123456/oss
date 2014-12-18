package com.shinowit.actions;

import com.opensymphony.xwork2.ActionSupport;
import com.shinowit.dao.BaseDao;
import com.shinowit.entity.AuthorizationEntity;
import com.shinowit.entity.MenuinfoEntity;
import com.shinowit.entity.RoleinfoEntity;

import javax.annotation.Resource;

public class AuthorizationAction extends ActionSupport {
    private String menuId;
    private String idList;
    private String[] idList1;
    private String roleName;
    private String roleId;
    @Resource
    private BaseDao<RoleinfoEntity> roleDao;
    @Resource
    private BaseDao<AuthorizationEntity> authorizationDao;

    public String authorizationInsertExecute() {
        RoleinfoEntity role = new RoleinfoEntity();
        role.setRoleName(roleName);
        try {
            role.setStatus(true);
            roleDao.insert(role);
            for (int i = 0; i < idList1.length; i++) {
                MenuinfoEntity menu = new MenuinfoEntity();
                AuthorizationEntity au = new AuthorizationEntity();
                menu.setMenuId(idList1[i]);
                au.setMenuinfoByMenuId(menu);
                au.setRoleinfoByRoleId(role);
                au.setEnabled(true);
                authorizationDao.insert(au);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return SUCCESS;
    }

    public String authorizationdelExecute() {
        String strID[] = idList.split(",");
        for (int i = 0; i < strID.length; i++) {
            String hql = "delete from AuthorizationEntity where id = ?";
            authorizationDao.executeByHql(hql, strID[i]);
        }
        return SUCCESS;
    }

    public String authorizatrionEditExecute() {
        RoleinfoEntity role = new RoleinfoEntity();
        role.setRoleName(roleName);
        role.setStatus(true);
        role.setRoleId(roleId);
        try {
            roleDao.update(role);
            authorizationDao.executeByHql("delete from AuthorizationEntity where roleinfoByRoleId.roleId = ?", roleId);
            for (int i = 0; i < idList1.length; i++) {
                MenuinfoEntity menu = new MenuinfoEntity();
                AuthorizationEntity au = new AuthorizationEntity();
                menu.setMenuId(idList1[i]);
                au.setMenuinfoByMenuId(menu);
                au.setRoleinfoByRoleId(role);
                au.setEnabled(true);
                authorizationDao.insert(au);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return SUCCESS;
    }

    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    public String getIdList() {
        return idList;
    }

    public void setIdList(String idList) {
        this.idList = idList;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    public String[] getIdList1() {
        return idList1;
    }

    public void setIdList1(String[] idList1) {
        this.idList1 = idList1;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }
}
