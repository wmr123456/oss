package com.shinowit.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;

/**
 * Created by Administrator on 2014/11/14.
 */
@Entity
@Table(name = "loginfo")
public class LoginfoEntity {
    private String id;
    private Timestamp logTime;
    private String ip;
    private String content;
    private OperinfoEntity operinfoByOperId;
    private MenuinfoEntity menuinfoByMenuId;

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
    @Column(name = "LogTime")
    public Timestamp getLogTime() {
        return logTime;
    }

    public void setLogTime(Timestamp logTime) {
        this.logTime = logTime;
    }

    @Basic
    @Column(name = "IP")
    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    @Basic
    @Column(name = "Content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        LoginfoEntity that = (LoginfoEntity) o;

        if (content != null ? !content.equals(that.content) : that.content != null) return false;
        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (ip != null ? !ip.equals(that.ip) : that.ip != null) return false;
        if (logTime != null ? !logTime.equals(that.logTime) : that.logTime != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (logTime != null ? logTime.hashCode() : 0);
        result = 31 * result + (ip != null ? ip.hashCode() : 0);
        result = 31 * result + (content != null ? content.hashCode() : 0);
        return result;
    }

    @ManyToOne
    @JoinColumn(name = "OperID", referencedColumnName = "OperID")
    public OperinfoEntity getOperinfoByOperId() {
        return operinfoByOperId;
    }

    public void setOperinfoByOperId(OperinfoEntity operinfoByOperId) {
        this.operinfoByOperId = operinfoByOperId;
    }

    @ManyToOne
    @JoinColumn(name = "menuId", referencedColumnName = "menuId")
    public MenuinfoEntity getMenuinfoByMenuId() {
        return menuinfoByMenuId;
    }

    public void setMenuinfoByMenuId(MenuinfoEntity menuinfoByMenuId) {
        this.menuinfoByMenuId = menuinfoByMenuId;
    }
}
