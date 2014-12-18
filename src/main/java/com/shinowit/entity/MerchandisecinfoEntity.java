package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "merchandisecinfo")
public class MerchandisecinfoEntity {
    private String merchandiseCid;
    private String merchandiseCName;
    private Integer sortId;
    private Boolean status;
//    private Collection<MerchandiseinfoEntity> merchandiseinfosByMerchandiseCid;

    @Id
    @GenericGenerator(name = "system-uuid", strategy = "uuid") //有编译警告不用管
    @GeneratedValue(generator = "system-uuid")
    @Column(name = "MerchandiseCID")
    public String getMerchandiseCid() {
        return merchandiseCid;
    }

    public void setMerchandiseCid(String merchandiseCid) {
        this.merchandiseCid = merchandiseCid;
    }

    @Basic
    @Column(name = "MerchandiseCName")
    public String getMerchandiseCName() {
        return merchandiseCName;
    }

    public void setMerchandiseCName(String merchandiseCName) {
        this.merchandiseCName = merchandiseCName;
    }

    @Basic
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SortID")
    public Integer getSortId() {
        return sortId;
    }

    public void setSortId(Integer sortId) {
        this.sortId = sortId;
    }

    @Basic
    @Column(name = "Status")
    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        MerchandisecinfoEntity that = (MerchandisecinfoEntity) o;

        if (merchandiseCName != null ? !merchandiseCName.equals(that.merchandiseCName) : that.merchandiseCName != null)
            return false;
        if (merchandiseCid != null ? !merchandiseCid.equals(that.merchandiseCid) : that.merchandiseCid != null)
            return false;
        if (sortId != null ? !sortId.equals(that.sortId) : that.sortId != null) return false;
        if (status != null ? !status.equals(that.status) : that.status != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = merchandiseCid != null ? merchandiseCid.hashCode() : 0;
        result = 31 * result + (merchandiseCName != null ? merchandiseCName.hashCode() : 0);
        result = 31 * result + (sortId != null ? sortId.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        return result;
    }

//    @OneToMany(mappedBy = "merchandisecinfoByMerchandiseCid",fetch = FetchType.LAZY)
//    public Collection<MerchandiseinfoEntity> getMerchandiseinfosByMerchandiseCid() {
//        return merchandiseinfosByMerchandiseCid;
//    }
//
//    public void setMerchandiseinfosByMerchandiseCid(Collection<MerchandiseinfoEntity> merchandiseinfosByMerchandiseCid) {
//        this.merchandiseinfosByMerchandiseCid = merchandiseinfosByMerchandiseCid;
//    }
}
