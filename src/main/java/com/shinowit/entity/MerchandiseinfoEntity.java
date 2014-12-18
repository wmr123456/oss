package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.math.BigDecimal;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "merchandiseinfo")
public class MerchandiseinfoEntity {
    private String merchandiseId;
    private String merchandiseName;
    private String merchandiseAb;
    private BigDecimal price;
    private Boolean saleStatus;
    private String spec;
    private String descri;
    private String picPath;
    private Integer clickCount;
    private String remark;
    //    private Collection<InstockdetailsinfoEntity> instockdetailsinfosByMerchandiseId;
    private ProstatusinfoEntity prostatusinfoByProStatusId;//
    private UnitinfoEntity unitinfoByUnitInfoId;//
    private MerchandisecinfoEntity merchandisecinfoByMerchandiseCid;//
//    private Collection<OrderdetailsinfoEntity> orderdetailsinfosByMerchandiseId;
//    private Collection<OutstockdetailsinfoEntity> outstockdetailsinfosByMerchandiseId;
//    private Collection<StockinfoEntity> stockinfosByMerchandiseId;

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "MerchandiseID")
    public String getMerchandiseId() {
        return merchandiseId;
    }

    public void setMerchandiseId(String merchandiseId) {
        this.merchandiseId = merchandiseId;
    }

    @Basic
    @Column(name = "MerchandiseName")
    public String getMerchandiseName() {
        return merchandiseName;
    }

    public void setMerchandiseName(String merchandiseName) {
        this.merchandiseName = merchandiseName;
    }

    @Basic
    @Column(name = "MerchandiseAB")
    public String getMerchandiseAb() {
        return merchandiseAb;
    }

    public void setMerchandiseAb(String merchandiseAb) {
        this.merchandiseAb = merchandiseAb;
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
    @Column(name = "SaleStatus")
    public Boolean getSaleStatus() {
        return saleStatus;
    }

    public void setSaleStatus(Boolean saleStatus) {
        this.saleStatus = saleStatus;
    }

    @Basic
    @Column(name = "Spec")
    public String getSpec() {
        return spec;
    }

    public void setSpec(String spec) {
        this.spec = spec;
    }

    @Basic
    @Column(name = "Descri")
    public String getDescri() {
        return descri;
    }

    public void setDescri(String descri) {
        this.descri = descri;
    }

    @Basic
    @Column(name = "PicPath")
    public String getPicPath() {
        return picPath;
    }

    public void setPicPath(String picPath) {
        this.picPath = picPath;
    }

    @Basic
    @Column(name = "ClickCount")
    public Integer getClickCount() {
        return clickCount;
    }

    public void setClickCount(Integer clickCount) {
        this.clickCount = clickCount;
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

        MerchandiseinfoEntity that = (MerchandiseinfoEntity) o;

        if (clickCount != null ? !clickCount.equals(that.clickCount) : that.clickCount != null) return false;
        if (descri != null ? !descri.equals(that.descri) : that.descri != null) return false;
        if (merchandiseAb != null ? !merchandiseAb.equals(that.merchandiseAb) : that.merchandiseAb != null)
            return false;
        if (merchandiseId != null ? !merchandiseId.equals(that.merchandiseId) : that.merchandiseId != null)
            return false;
        if (merchandiseName != null ? !merchandiseName.equals(that.merchandiseName) : that.merchandiseName != null)
            return false;
        if (picPath != null ? !picPath.equals(that.picPath) : that.picPath != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;
        if (saleStatus != null ? !saleStatus.equals(that.saleStatus) : that.saleStatus != null) return false;
        if (spec != null ? !spec.equals(that.spec) : that.spec != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = merchandiseId != null ? merchandiseId.hashCode() : 0;
        result = 31 * result + (merchandiseName != null ? merchandiseName.hashCode() : 0);
        result = 31 * result + (merchandiseAb != null ? merchandiseAb.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (saleStatus != null ? saleStatus.hashCode() : 0);
        result = 31 * result + (spec != null ? spec.hashCode() : 0);
        result = 31 * result + (descri != null ? descri.hashCode() : 0);
        result = 31 * result + (picPath != null ? picPath.hashCode() : 0);
        result = 31 * result + (clickCount != null ? clickCount.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

//    @OneToMany(mappedBy = "merchandiseinfoByMerchandiseId")
//    public Collection<InstockdetailsinfoEntity> getInstockdetailsinfosByMerchandiseId() {
//        return instockdetailsinfosByMerchandiseId;
//    }
//
//    public void setInstockdetailsinfosByMerchandiseId(Collection<InstockdetailsinfoEntity> instockdetailsinfosByMerchandiseId) {
//        this.instockdetailsinfosByMerchandiseId = instockdetailsinfosByMerchandiseId;
//    }

    @ManyToOne
//    @Cascade(value = CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "ProStatusID", referencedColumnName = "ProStatusID")
    public ProstatusinfoEntity getProstatusinfoByProStatusId() {
        return prostatusinfoByProStatusId;
    }

    public void setProstatusinfoByProStatusId(ProstatusinfoEntity prostatusinfoByProStatusId) {
        this.prostatusinfoByProStatusId = prostatusinfoByProStatusId;
    }

    @ManyToOne
//    @Cascade(value = CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "UnitInfoID", referencedColumnName = "UnitInfoID")
    public UnitinfoEntity getUnitinfoByUnitInfoId() {
        return unitinfoByUnitInfoId;
    }

    public void setUnitinfoByUnitInfoId(UnitinfoEntity unitinfoByUnitInfoId) {
        this.unitinfoByUnitInfoId = unitinfoByUnitInfoId;
    }

    @ManyToOne
//    @Cascade(value = CascadeType.SAVE_UPDATE)
    @JoinColumn(name = "MerchandiseCID", referencedColumnName = "MerchandiseCID")
    public MerchandisecinfoEntity getMerchandisecinfoByMerchandiseCid() {
        return merchandisecinfoByMerchandiseCid;
    }

    public void setMerchandisecinfoByMerchandiseCid(MerchandisecinfoEntity merchandisecinfoByMerchandiseCid) {
        this.merchandisecinfoByMerchandiseCid = merchandisecinfoByMerchandiseCid;
    }

//    @OneToMany(mappedBy = "merchandiseinfoByMerchandiseId")
//    public Collection<OrderdetailsinfoEntity> getOrderdetailsinfosByMerchandiseId() {
//        return orderdetailsinfosByMerchandiseId;
//    }
//
//    public void setOrderdetailsinfosByMerchandiseId(Collection<OrderdetailsinfoEntity> orderdetailsinfosByMerchandiseId) {
//        this.orderdetailsinfosByMerchandiseId = orderdetailsinfosByMerchandiseId;
//    }
//
//    @OneToMany(mappedBy = "merchandiseinfoByMerchandiseId")
//    public Collection<OutstockdetailsinfoEntity> getOutstockdetailsinfosByMerchandiseId() {
//        return outstockdetailsinfosByMerchandiseId;
//    }
//
//    public void setOutstockdetailsinfosByMerchandiseId(Collection<OutstockdetailsinfoEntity> outstockdetailsinfosByMerchandiseId) {
//        this.outstockdetailsinfosByMerchandiseId = outstockdetailsinfosByMerchandiseId;
//    }
//
//    @OneToMany(mappedBy = "merchandiseinfoByMerchandiseId")
//    public Collection<StockinfoEntity> getStockinfosByMerchandiseId() {
//        return stockinfosByMerchandiseId;
//    }
//
//    public void setStockinfosByMerchandiseId(Collection<StockinfoEntity> stockinfosByMerchandiseId) {
//        this.stockinfosByMerchandiseId = stockinfosByMerchandiseId;
//    }
}
