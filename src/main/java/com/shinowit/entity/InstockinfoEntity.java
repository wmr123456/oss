package com.shinowit.entity;

import org.apache.struts2.json.annotations.JSON;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "instockinfo")
public class InstockinfoEntity {
    private String billCode;
    private byte inType;
    private Timestamp inTime;
    private String hander;
    private BigDecimal totalMoney;
    private String remark;
    //    private Collection<InstockdetailsinfoEntity> instockdetailsinfosByBillCode;
    private SupplierinfoEntity supplierinfoBySupplierId;
    private OperinfoEntity operinfoByOperId;

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "BillCode")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "InType")
    public byte getInType() {
        return inType;
    }

    public void setInType(byte inType) {
        this.inType = inType;
    }

    @Basic
    @Column(name = "InTime")
    @JSON(format = "yyyy-MM-dd HH:mm:dd")
    public Timestamp getInTime() {
        return inTime;
    }

    public void setInTime(Timestamp inTime) {
        this.inTime = inTime;
    }

    @Basic
    @Column(name = "Hander")
    public String getHander() {
        return hander;
    }

    public void setHander(String hander) {
        this.hander = hander;
    }

    @Basic
    @Column(name = "TotalMoney")
    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
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

        InstockinfoEntity that = (InstockinfoEntity) o;

        if (inType != that.inType) return false;
        if (billCode != null ? !billCode.equals(that.billCode) : that.billCode != null) return false;
        if (hander != null ? !hander.equals(that.hander) : that.hander != null) return false;
        if (inTime != null ? !inTime.equals(that.inTime) : that.inTime != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = billCode != null ? billCode.hashCode() : 0;
        result = 31 * result + (int) inType;
        result = 31 * result + (inTime != null ? inTime.hashCode() : 0);
        result = 31 * result + (hander != null ? hander.hashCode() : 0);
        result = 31 * result + (totalMoney != null ? totalMoney.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

//    @OneToMany(mappedBy = "instockinfoByBillCode",fetch = FetchType.LAZY)
//    public Collection<InstockdetailsinfoEntity> getInstockdetailsinfosByBillCode() {
//        return instockdetailsinfosByBillCode;
//    }
//
//    public void setInstockdetailsinfosByBillCode(Collection<InstockdetailsinfoEntity> instockdetailsinfosByBillCode) {
//        this.instockdetailsinfosByBillCode = instockdetailsinfosByBillCode;
//    }

    @ManyToOne
    @JoinColumn(name = "SupplierID", referencedColumnName = "SupplierID")
    public SupplierinfoEntity getSupplierinfoBySupplierId() {
        return supplierinfoBySupplierId;
    }

    public void setSupplierinfoBySupplierId(SupplierinfoEntity supplierinfoBySupplierId) {
        this.supplierinfoBySupplierId = supplierinfoBySupplierId;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public OperinfoEntity getOperinfoByOperId() {
        return operinfoByOperId;
    }

    public void setOperinfoByOperId(OperinfoEntity operinfoByOperId) {
        this.operinfoByOperId = operinfoByOperId;
    }
}
