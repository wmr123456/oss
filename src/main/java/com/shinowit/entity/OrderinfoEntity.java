package com.shinowit.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "orderinfo")
public class OrderinfoEntity {
    private String billCode;
    private String postBillCode;
    private byte billStatus;
    private Timestamp billData;
    private String consignee;
    private String phone;
    private String adress;
    private String postcode;
    private BigDecimal price;
    private String remark;
    private Collection<OrderdetailsinfoEntity> orderdetailsinfosByBillCode;
    private MemberinfoEntity memberinfoByMemberId;
    private DeliveryinfoEntity deliveryinfoByDeliveryId;
    private OperinfoEntity operinfoByoperId;
    private OutstockinfoEntity outstockinfoByoutID;

    @Id
    @Column(name = "BillCode")
    public String getBillCode() {
        return billCode;
    }

    public void setBillCode(String billCode) {
        this.billCode = billCode;
    }

    @Basic
    @Column(name = "PostBillCode")
    public String getPostBillCode() {
        return postBillCode;
    }

    public void setPostBillCode(String postBillCode) {
        this.postBillCode = postBillCode;
    }

    @Basic
    @Column(name = "BillStatus")
    public byte getBillStatus() {
        return billStatus;
    }

    public void setBillStatus(byte billStatus) {
        this.billStatus = billStatus;
    }

    @Basic
    @Column(name = "BillData")
    public Timestamp getBillData() {
        return billData;
    }

    public void setBillData(Timestamp billData) {
        this.billData = billData;
    }

    @Basic
    @Column(name = "Consignee")
    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    @Basic
    @Column(name = "Phone")
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    @Basic
    @Column(name = "Adress")
    public String getAdress() {
        return adress;
    }

    public void setAdress(String adress) {
        this.adress = adress;
    }

    @Basic
    @Column(name = "Postcode")
    public String getPostcode() {
        return postcode;
    }

    public void setPostcode(String postcode) {
        this.postcode = postcode;
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

        OrderinfoEntity that = (OrderinfoEntity) o;

        if (billStatus != that.billStatus) return false;
        if (adress != null ? !adress.equals(that.adress) : that.adress != null) return false;
        if (billCode != null ? !billCode.equals(that.billCode) : that.billCode != null) return false;
        if (billData != null ? !billData.equals(that.billData) : that.billData != null) return false;
        if (consignee != null ? !consignee.equals(that.consignee) : that.consignee != null) return false;
        if (phone != null ? !phone.equals(that.phone) : that.phone != null) return false;
        if (postBillCode != null ? !postBillCode.equals(that.postBillCode) : that.postBillCode != null) return false;
        if (postcode != null ? !postcode.equals(that.postcode) : that.postcode != null) return false;
        if (price != null ? !price.equals(that.price) : that.price != null) return false;
        if (remark != null ? !remark.equals(that.remark) : that.remark != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = billCode != null ? billCode.hashCode() : 0;
        result = 31 * result + (postBillCode != null ? postBillCode.hashCode() : 0);
        result = 31 * result + (int) billStatus;
        result = 31 * result + (billData != null ? billData.hashCode() : 0);
        result = 31 * result + (consignee != null ? consignee.hashCode() : 0);
        result = 31 * result + (phone != null ? phone.hashCode() : 0);
        result = 31 * result + (adress != null ? adress.hashCode() : 0);
        result = 31 * result + (postcode != null ? postcode.hashCode() : 0);
        result = 31 * result + (price != null ? price.hashCode() : 0);
        result = 31 * result + (remark != null ? remark.hashCode() : 0);
        return result;
    }

    @OneToMany(mappedBy = "orderinfoByBillCode")
    public Collection<OrderdetailsinfoEntity> getOrderdetailsinfosByBillCode() {
        return orderdetailsinfosByBillCode;
    }

    public void setOrderdetailsinfosByBillCode(Collection<OrderdetailsinfoEntity> orderdetailsinfosByBillCode) {
        this.orderdetailsinfosByBillCode = orderdetailsinfosByBillCode;
    }

    @ManyToOne
    @JoinColumn(name = "MemberID", referencedColumnName = "MemberID")
    public MemberinfoEntity getMemberinfoByMemberId() {
        return memberinfoByMemberId;
    }

    public void setMemberinfoByMemberId(MemberinfoEntity memberinfoByMemberId) {
        this.memberinfoByMemberId = memberinfoByMemberId;
    }

    @ManyToOne
    @JoinColumn(name = "DeliveryID", referencedColumnName = "DeliveryID")
    public DeliveryinfoEntity getDeliveryinfoByDeliveryId() {
        return deliveryinfoByDeliveryId;
    }

    public void setDeliveryinfoByDeliveryId(DeliveryinfoEntity deliveryinfoByDeliveryId) {
        this.deliveryinfoByDeliveryId = deliveryinfoByDeliveryId;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public OperinfoEntity getOperinfoByoperId() {
        return operinfoByoperId;
    }

    public void setOperinfoByoperId(OperinfoEntity operinfoByoperId) {
        this.operinfoByoperId = operinfoByoperId;
    }

    @ManyToOne
    @JoinColumn(name = "OutCode", referencedColumnName = "OutCode")
    public OutstockinfoEntity getOutstockinfoByoutID() {
        return outstockinfoByoutID;
    }

    public void setOutstockinfoByoutID(OutstockinfoEntity outstockinfoByoutID) {
        this.outstockinfoByoutID = outstockinfoByoutID;
    }
}
