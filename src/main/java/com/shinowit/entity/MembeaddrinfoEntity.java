package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "membeaddrinfo")
public class MembeaddrinfoEntity {
    private String id;
    private String recMan;
    private String telphone;
    private String recAddress;
    private String postCode;
    private Boolean isDefault;
    private MemberinfoEntity memberinfoByMemberId;

    @Id
    @Column(name = "ID")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "RecMan")
    public String getRecMan() {
        return recMan;
    }

    public void setRecMan(String recMan) {
        this.recMan = recMan;
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
    @Column(name = "RecAddress")
    public String getRecAddress() {
        return recAddress;
    }

    public void setRecAddress(String recAddress) {
        this.recAddress = recAddress;
    }

    @Basic
    @Column(name = "PostCode")
    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    @Basic
    @Column(name = "IsDefault")
    public Boolean getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(Boolean isDefault) {
        this.isDefault = isDefault;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MembeaddrinfoEntity that = (MembeaddrinfoEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (isDefault != null ? !isDefault.equals(that.isDefault) : that.isDefault != null) return false;
        if (postCode != null ? !postCode.equals(that.postCode) : that.postCode != null) return false;
        if (recAddress != null ? !recAddress.equals(that.recAddress) : that.recAddress != null) return false;
        if (recMan != null ? !recMan.equals(that.recMan) : that.recMan != null) return false;
        if (telphone != null ? !telphone.equals(that.telphone) : that.telphone != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (recMan != null ? recMan.hashCode() : 0);
        result = 31 * result + (telphone != null ? telphone.hashCode() : 0);
        result = 31 * result + (recAddress != null ? recAddress.hashCode() : 0);
        result = 31 * result + (postCode != null ? postCode.hashCode() : 0);
        result = 31 * result + (isDefault != null ? isDefault.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "MemberID", referencedColumnName = "MemberID")
    public MemberinfoEntity getMemberinfoByMemberId() {
        return memberinfoByMemberId;
    }

    public void setMemberinfoByMemberId(MemberinfoEntity memberinfoByMemberId) {
        this.memberinfoByMemberId = memberinfoByMemberId;
    }
}
