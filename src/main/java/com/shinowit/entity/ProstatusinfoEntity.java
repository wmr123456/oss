package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "prostatusinfo")
public class ProstatusinfoEntity {
    private String proStatusId;
    private String proStatusName;
    private Boolean status;
    private String remark;
//    private Collection<MerchandiseinfoEntity> merchandiseinfosByProStatusId;


    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "ProStatusID")
    public String getProStatusId() {
        return proStatusId;
    }

    public void setProStatusId(String proStatusId) {
        this.proStatusId = proStatusId;
    }


    @Basic
    @Column(name = "ProStatusName")
    public String getProStatusName() {
        return proStatusName;
    }

    public void setProStatusName(String proStatusName) {
        this.proStatusName = proStatusName;
    }


    @Basic
    @Column(name = "status")
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

//    @OneToMany(mappedBy = "prostatusinfoByProStatusId")
//    public Collection<MerchandiseinfoEntity> getMerchandiseinfosByProStatusId() {
//        return merchandiseinfosByProStatusId;
//    }
//
//    public void setMerchandiseinfosByProStatusId(Collection<MerchandiseinfoEntity> merchandiseinfosByProStatusId) {
//        this.merchandiseinfosByProStatusId = merchandiseinfosByProStatusId;
//    }
}
