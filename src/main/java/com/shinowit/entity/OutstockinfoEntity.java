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
@Table(name = "outstockinfo")
public class OutstockinfoEntity {
    private String outCode;
    private Timestamp outTime;
    private String hander;
    private byte totalType;
    private BigDecimal totalMoney;
    private String remark;
    //    private Collection<OutstockdetailsinfoEntity> outstockdetailsinfosByOutCode;
    private OperinfoEntity operinfoByoperId;

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "OutCode")
    public String getOutCode() {
        return outCode;
    }

    public void setOutCode(String outCode) {
        this.outCode = outCode;
    }

    @Basic
    @Column(name = "OutTime")
    @JSON(format = "yyyy-MM-dd HH:mm:dd")
    public Timestamp getOutTime() {
        return outTime;
    }

    public void setOutTime(Timestamp outTime) {
        this.outTime = outTime;
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
    @Column(name = "TotalType")
    public byte getTotalType() {
        return totalType;
    }

    public void setTotalType(byte totalType) {
        this.totalType = totalType;
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

        OutstockinfoEntity that = (OutstockinfoEntity) o;

        if (totalType != that.totalType) return false;
        if (hander != null ? !hander.equals(that.hander) : that.hander != null) return false;
        if (outCode != null ? !outCode.equals(that.outCode) : that.outCode != null) return false;
        if (outTime != null ? !outTime.equals(that.outTime) : that.outTime != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (totalMoney != null ? !totalMoney.equals(that.totalMoney) : that.totalMoney != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = outCode != null ? outCode.hashCode() : 0;
        result = 31 * result + (outTime != null ? outTime.hashCode() : 0);
        result = 31 * result + (hander != null ? hander.hashCode() : 0);
        result = 31 * result + (int) totalType;
        result = 31 * result + (totalMoney != null ? totalMoney.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

//    @OneToMany(mappedBy = "outstockinfoByOutCode")
//    public Collection<OutstockdetailsinfoEntity> getOutstockdetailsinfosByOutCode() {
//        return outstockdetailsinfosByOutCode;
//    }
//
//    public void setOutstockdetailsinfosByOutCode(Collection<OutstockdetailsinfoEntity> outstockdetailsinfosByOutCode) {
//        this.outstockdetailsinfosByOutCode = outstockdetailsinfosByOutCode;
//    }

    @ManyToOne
    @JoinColumn(name = "operId", referencedColumnName = "operId")
    public OperinfoEntity getOperinfoByoperId() {
        return operinfoByoperId;
    }

    public void setOperinfoByoperId(OperinfoEntity operinfoByoperId) {
        this.operinfoByoperId = operinfoByoperId;
    }
}
