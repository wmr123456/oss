package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "memberinfo")
public class MemberinfoEntity {
    private String memberId;
    private String memberName;
    private String password;
    private String email;
    private String name;
    private BigDecimal balance;
    private Timestamp registDate;
    private Boolean status;
    private String remark;
    private Collection<MembeaddrinfoEntity> membeaddrinfosByMemberId;
    private Collection<OrderinfoEntity> orderinfosByMemberId;
    private Collection<SupplyrecordinfoEntity> supplyrecordinfosByMemberId;

    @Id
    @Column(name = "MemberID")
    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    @Basic
    @Column(name = "MemberName")
    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
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
    @Column(name = "Email")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Basic
    @Column(name = "Name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Basic
    @Column(name = "Balance")
    public BigDecimal getBalance() {
        return balance;
    }

    public void setBalance(BigDecimal balance) {
        this.balance = balance;
    }

    @Basic
    @Column(name = "RegistDate")
    public Timestamp getRegistDate() {
        return registDate;
    }

    public void setRegistDate(Timestamp registDate) {
        this.registDate = registDate;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Basic
    @Column(name = "Remark")
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MemberinfoEntity that = (MemberinfoEntity) o;

        if (balance != null ? !balance.equals(that.balance) : that.balance != null) return false;
        if (email != null ? !email.equals(that.email) : that.email != null) return false;
        if (memberId != null ? !memberId.equals(that.memberId) : that.memberId != null) return false;
        if (memberName != null ? !memberName.equals(that.memberName) : that.memberName != null) return false;
        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;
        if (registDate != null ? !registDate.equals(that.registDate) : that.registDate != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = memberId != null ? memberId.hashCode() : 0;
        result = 31 * result + (memberName != null ? memberName.hashCode() : 0);
        result = 31 * result + (password != null ? password.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (balance != null ? balance.hashCode() : 0);
        result = 31 * result + (registDate != null ? registDate.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "memberinfoByMemberId")
    public Collection<MembeaddrinfoEntity> getMembeaddrinfosByMemberId() {
        return membeaddrinfosByMemberId;
    }

    public void setMembeaddrinfosByMemberId(Collection<MembeaddrinfoEntity> membeaddrinfosByMemberId) {
        this.membeaddrinfosByMemberId = membeaddrinfosByMemberId;
    }

    @OneToMany(mappedBy = "memberinfoByMemberId")
    public Collection<OrderinfoEntity> getOrderinfosByMemberId() {
        return orderinfosByMemberId;
    }

    public void setOrderinfosByMemberId(Collection<OrderinfoEntity> orderinfosByMemberId) {
        this.orderinfosByMemberId = orderinfosByMemberId;
    }

    @OneToMany(mappedBy = "memberinfoByMemberId")
    public Collection<SupplyrecordinfoEntity> getSupplyrecordinfosByMemberId() {
        return supplyrecordinfosByMemberId;
    }

    public void setSupplyrecordinfosByMemberId(Collection<SupplyrecordinfoEntity> supplyrecordinfosByMemberId) {
        this.supplyrecordinfosByMemberId = supplyrecordinfosByMemberId;
    }
}
