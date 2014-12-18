package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "outstockdetailsinfo")
public class OutstockdetailsinfoEntity {
    private String id;
    private int num;
    private BigDecimal price;
    private BigDecimal stockPrice;
    private BigDecimal total;
    private OutstockinfoEntity outstockinfoByOutCode;
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
    @Column(name = "StockPrice")
    public BigDecimal getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(BigDecimal stockPrice) {
        this.stockPrice = stockPrice;
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

        OutstockdetailsinfoEntity that = (OutstockdetailsinfoEntity) o;

        if (num != that.num) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (stockPrice != null ? !stockPrice.equals(that.stockPrice) : that.stockPrice != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + num;
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (stockPrice != null ? stockPrice.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "OutCode", referencedColumnName = "OutCode")
    public OutstockinfoEntity getOutstockinfoByOutCode() {
        return outstockinfoByOutCode;
    }

    public void setOutstockinfoByOutCode(OutstockinfoEntity outstockinfoByOutCode) {
        this.outstockinfoByOutCode = outstockinfoByOutCode;
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
