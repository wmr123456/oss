package com.shinowit.entity;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "unitinfo")
public class UnitinfoEntity {
    private byte unitInfoId;
    private String unitInfoName;
    private Boolean status;
    private String remark;
//    private Collection<MerchandiseinfoEntity> merchandiseinfosByUnitInfoId;
//    private Collection<OrderdetailsinfoEntity> orderdetailsinfosByUnitInfoId;

    @Id
    @Column(name = "UnitInfoID")
    public byte getUnitInfoId() {
        return unitInfoId;
    }

    public void setUnitInfoId(byte unitInfoId) {
        this.unitInfoId = unitInfoId;
    }

    @Basic
    @Column(name = "UnitInfoName")
    public String getUnitInfoName() {
        return unitInfoName;
    }

    public void setUnitInfoName(String unitInfoName) {
        this.unitInfoName = unitInfoName;
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

        UnitinfoEntity that = (UnitinfoEntity) o;

        if (unitInfoId != that.unitInfoId) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;
        if (unitInfoName != null ? !unitInfoName.equals(that.unitInfoName) : that.unitInfoName != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = (int) unitInfoId;
        result = 31 * result + (unitInfoName != null ? unitInfoName.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

//    @OneToMany(mappedBy = "unitinfoByUnitInfoId")
//    public Collection<MerchandiseinfoEntity> getMerchandiseinfosByUnitInfoId() {
//        return merchandiseinfosByUnitInfoId;
//    }
//
//    public void setMerchandiseinfosByUnitInfoId(Collection<MerchandiseinfoEntity> merchandiseinfosByUnitInfoId) {
//        this.merchandiseinfosByUnitInfoId = merchandiseinfosByUnitInfoId;
//    }
//
//    @OneToMany(mappedBy = "unitinfoByUnitInfoId")
//    public Collection<OrderdetailsinfoEntity> getOrderdetailsinfosByUnitInfoId() {
//        return orderdetailsinfosByUnitInfoId;
//    }
//
//    public void setOrderdetailsinfosByUnitInfoId(Collection<OrderdetailsinfoEntity> orderdetailsinfosByUnitInfoId) {
//        this.orderdetailsinfosByUnitInfoId = orderdetailsinfosByUnitInfoId;
//    }
}
