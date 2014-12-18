package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "roleinfo")
public class RoleinfoEntity {
    private String roleId;
    private String roleName;
    private Integer sortId;
    private Boolean status;
    private Collection<AuthorizationEntity> authorizationsByRoleId;
//    private Collection<OperinfoEntity> operinfosByRoleId;

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "RoleID")
    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    @Basic
    @Column(name = "RoleName")
    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
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

        RoleinfoEntity that = (RoleinfoEntity) o;

        if (roleId != null ? !roleId.equals(that.roleId) : that.roleId != null) return false;
        if (roleName != null ? !roleName.equals(that.roleName) : that.roleName != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = roleId != null ? roleId.hashCode() : 0;
        result = 31 * result + (roleName != null ? roleName.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "roleinfoByRoleId")
    public Collection<AuthorizationEntity> getAuthorizationsByRoleId() {
        return authorizationsByRoleId;
    }

    public void setAuthorizationsByRoleId(Collection<AuthorizationEntity> authorizationsByRoleId) {
        this.authorizationsByRoleId = authorizationsByRoleId;
    }

//    @OneToMany(mappedBy = "roleinfoByRoleId")
//    public Collection<OperinfoEntity> getOperinfosByRoleId() {
//        return operinfosByRoleId;
//    }
//
//    public void setOperinfosByRoleId(Collection<OperinfoEntity> operinfosByRoleId) {
//        this.operinfosByRoleId = operinfosByRoleId;
//    }
}
