package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "instockdetailsinfo")
public class InstockdetailsinfoEntity {
    private String id;
    private int num;
    private BigDecimal price;
    private BigDecimal total;
    private InstockinfoEntity instockinfoByBillCode;
    private MerchandiseinfoEntity merchandiseinfoByMerchandiseId;

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
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Basic
    @Column(name = "Price")
    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Basic
    @Column(name = "total")
    public BigDecimal getTotal() {
        return total;
    }

    public void setTotal(BigDecimal total) {
        this.total = total;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        InstockdetailsinfoEntity that = (InstockdetailsinfoEntity) o;

        if (num != that.num) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + num;
        result = 31 * result + (price != null ? price.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "BillCode", referencedColumnName = "BillCode")
    public InstockinfoEntity getInstockinfoByBillCode() {
        return instockinfoByBillCode;
    }

    public void setInstockinfoByBillCode(InstockinfoEntity instockinfoByBillCode) {
        this.instockinfoByBillCode = instockinfoByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "MerchandiseID", referencedColumnName = "MerchandiseID")
    public MerchandiseinfoEntity getMerchandiseinfoByMerchandiseId() {
        return merchandiseinfoByMerchandiseId;
    }

    public void setMerchandiseinfoByMerchandiseId(MerchandiseinfoEntity merchandiseinfoByMerchandiseId) {
        this.merchandiseinfoByMerchandiseId = merchandiseinfoByMerchandiseId;
    }
}
