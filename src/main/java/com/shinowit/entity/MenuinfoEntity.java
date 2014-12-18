package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "menuinfo")
public class MenuinfoEntity {
    private String menuId;
    private String menuName;
    private String uRl;
    private String pmenuId;
    private String sta;
    private String img;
    private Integer sortId;
    private Boolean status;
//    private Collection<AuthorizationEntity> authorizationsByMenuId;
//    private Collection<FuncmenuinfoEntity> funcmenuinfosByMenuId;

    @Id
    @Column(name = "MenuID")
    public String getMenuId() {
        return menuId;
    }

    public void setMenuId(String menuId) {
        this.menuId = menuId;
    }

    @Basic
    @Column(name = "MenuName")
    public String getMenuName() {
        return menuName;
    }

    public void setMenuName(String menuName) {
        this.menuName = menuName;
    }

    @Basic
    @Column(name = "URl")
    public String getuRl() {
        return uRl;
    }

    public void setuRl(String uRl) {
        this.uRl = uRl;
    }

    @Basic
    @Column(name = "PmenuID")
    public String getPmenuId() {
        return pmenuId;
    }

    public void setPmenuId(String pmenuId) {
        this.pmenuId = pmenuId;
    }

    @Basic
    @Column(name = "sta")
    public String getSta() {
        return sta;
    }

    public void setSta(String sta) {
        this.sta = sta;
    }

    @Basic
    @Column(name = "img")
    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    @Basic
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MenuinfoEntity that = (MenuinfoEntity) o;

        if (menuId != null ? !menuId.equals(that.menuId) : that.menuId != null) return false;
        if (menuName != null ? !menuName.equals(that.menuName) : that.menuName != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (uRl != null ? !uRl.equals(that.uRl) : that.uRl != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = menuId != null ? menuId.hashCode() : 0;
        result = 31 * result + (menuName != null ? menuName.hashCode() : 0);
        result = 31 * result + (uRl != null ? uRl.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }

//    @OneToMany(mappedBy = "menuinfoByMenuId")
//    public Collection<AuthorizationEntity> getAuthorizationsByMenuId() {
//        return authorizationsByMenuId;
//    }
//
//    public void setAuthorizationsByMenuId(Collection<AuthorizationEntity> authorizationsByMenuId) {
//        this.authorizationsByMenuId = authorizationsByMenuId;
//    }

//    @OneToMany(mappedBy = "menuinfoByMenuId")
//    public Collection<FuncmenuinfoEntity> getFuncmenuinfosByMenuId() {
//        return funcmenuinfosByMenuId;
//    }
//
//    public void setFuncmenuinfosByMenuId(Collection<FuncmenuinfoEntity> funcmenuinfosByMenuId) {
//        this.funcmenuinfosByMenuId = funcmenuinfosByMenuId;
//    }
}
