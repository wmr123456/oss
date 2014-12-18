package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "authorization")
public class AuthorizationEntity {
    private String id;
    private boolean isEnabled;
    private MenuinfoEntity menuinfoByMenuId;
    private RoleinfoEntity roleinfoByRoleId;

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "ID")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "IsEnabled")
    public boolean isEnabled() {
        return isEnabled;
    }

    public void setEnabled(boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        AuthorizationEntity that = (AuthorizationEntity) o;

        if (isEnabled != that.isEnabled) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (isEnabled ? 1 : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MenuID", referencedColumnName = "MenuID")
    public MenuinfoEntity getMenuinfoByMenuId() {
        return menuinfoByMenuId;
    }

    public void setMenuinfoByMenuId(MenuinfoEntity menuinfoByMenuId) {
        this.menuinfoByMenuId = menuinfoByMenuId;
    }

    @ManyToOne//(fetch = FetchType.LAZY)
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public RoleinfoEntity getRoleinfoByRoleId() {
        return roleinfoByRoleId;
    }

    public void setRoleinfoByRoleId(RoleinfoEntity roleinfoByRoleId) {
        this.roleinfoByRoleId = roleinfoByRoleId;
    }
}
