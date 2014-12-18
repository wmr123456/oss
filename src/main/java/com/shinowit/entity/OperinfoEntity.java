package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "operinfo")
public class OperinfoEntity {
    private String operId;
    private String operName;
    private String password;
    private String address;
    private String linkTel;
    private String qq;
    private String email;
    private String telphone;
    private Integer sortId;
    private Boolean status;
    //    private Collection<InstockinfoEntity> instockinfosByOperId;
//    private Collection<LoginfoEntity> loginfosByOperId;
    private RoleinfoEntity roleinfoByRoleId;

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "OperID")
    public String getOperId() {
        return operId;
    }

    public void setOperId(String operId) {
        this.operId = operId;
    }

    @Basic
    @Column(name = "OperName")
    public String getOperName() {
        return operName;
    }

    public void setOperName(String operName) {
        this.operName = operName;
    }

    @Basic
    @Column(name = "Password")
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Basic
    @Column(name = "Address")
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    @Basic
    @Column(name = "LinkTel")
    public String getLinkTel() {
        return linkTel;
    }

    public void setLinkTel(String linkTel) {
        this.linkTel = linkTel;
    }

    @Basic
    @Column(name = "QQ")
    public String getQq() {
        return qq;
    }

    public void setQq(String qq) {
        this.qq = qq;
    }

    @Basic
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "Telphone")
    public String getTelphone() {
        return telphone;
    }

    public void setTelphone(String telphone) {
        this.telphone = telphone;
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

        OperinfoEntity that = (OperinfoEntity) o;

        if (address != null ? !address.equals(that.address) : that.address != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (linkTel != null ? !linkTel.equals(that.linkTel) : that.linkTel != null) return false;
        if (operId != null ? !operId.equals(that.operId) : that.operId != null) return false;
        if (operName != null ? !operName.equals(that.operName) : that.operName != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (qq != null ? !qq.equals(that.qq) : that.qq != null) return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (telphone != null ? !telphone.equals(that.telphone) : that.telphone != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = operId != null ? operId.hashCode() : 0;
        result = 31 * result + (operName != null ? operName.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (linkTel != null ? linkTel.hashCode() : 0);
        result = 31 * result + (qq != null ? qq.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (telphone != null ? telphone.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }

//    @OneToMany(mappedBy = "operinfoByOperId")
//    public Collection<InstockinfoEntity> getInstockinfosByOperId() {
//        return instockinfosByOperId;
//    }
//
//    public void setInstockinfosByOperId(Collection<InstockinfoEntity> instockinfosByOperId) {
//        this.instockinfosByOperId = instockinfosByOperId;
//    }
//
//    @OneToMany(mappedBy = "operinfoByOperId")
//    public Collection<LoginfoEntity> getLoginfosByOperId() {
//        return loginfosByOperId;
//    }
//
//    public void setLoginfosByOperId(Collection<LoginfoEntity> loginfosByOperId) {
//        this.loginfosByOperId = loginfosByOperId;
//    }

    @ManyToOne
    @JoinColumn(name = "RoleID", referencedColumnName = "RoleID")
    public RoleinfoEntity getRoleinfoByRoleId() {
        return roleinfoByRoleId;
    }

    public void setRoleinfoByRoleId(RoleinfoEntity roleinfoByRoleId) {
        this.roleinfoByRoleId = roleinfoByRoleId;
    }
}
