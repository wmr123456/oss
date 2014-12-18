package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "orderdetailsinfo")
public class OrderdetailsinfoEntity {
    private String id;
    private Integer sum;
    private BigDecimal price;
    private UnitinfoEntity unitinfoByUnitInfoId;
    private MerchandiseinfoEntity merchandiseinfoByMerchandiseId;
    private OrderinfoEntity orderinfoByBillCode;

    @Id
    @Column(name = "ID")
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Basic
    @Column(name = "Sum")
    public Integer getSum() {
        return sum;
    }

    public void setSum(Integer sum) {
        this.sum = sum;
    }

    @Basic
    @Column(name = "price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        OrderdetailsinfoEntity that = (OrderdetailsinfoEntity) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (sum != null ? !sum.equals(that.sum) : that.sum != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (sum != null ? sum.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "UnitInfoID", referencedColumnName = "UnitInfoID")
    public UnitinfoEntity getUnitinfoByUnitInfoId() {
        return unitinfoByUnitInfoId;
    }

    public void setUnitinfoByUnitInfoId(UnitinfoEntity unitinfoByUnitInfoId) {
        this.unitinfoByUnitInfoId = unitinfoByUnitInfoId;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public MerchandiseinfoEntity getMerchandiseinfoByMerchandiseId() {
        return merchandiseinfoByMerchandiseId;
    }

    public void setMerchandiseinfoByMerchandiseId(MerchandiseinfoEntity merchandiseinfoByMerchandiseId) {
        this.merchandiseinfoByMerchandiseId = merchandiseinfoByMerchandiseId;
    }

    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public OrderinfoEntity getOrderinfoByBillCode() {
        return orderinfoByBillCode;
    }

    public void setOrderinfoByBillCode(OrderinfoEntity orderinfoByBillCode) {
        this.orderinfoByBillCode = orderinfoByBillCode;
    }
}
