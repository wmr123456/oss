package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "stockinfo")
public class StockinfoEntity {
    private String id;
    private BigDecimal avgPrice;
    private int num;
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
    @Column(name = "AvgPrice")
    public BigDecimal getAvgPrice() {
        return avgPrice;
    }

    public void setAvgPrice(BigDecimal avgPrice) {
        this.avgPrice = avgPrice;
    }

    @Basic
    @Column(name = "Num")
    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        StockinfoEntity that = (StockinfoEntity) o;

        if (num != that.num) return false;
        if (avgPrice != null ? !avgPrice.equals(that.avgPrice) : that.avgPrice != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (avgPrice != null ? avgPrice.hashCode() : 0);
        result = 31 * result + num;
        return result;
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
