package com.bontsi.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A Bill.
 */
@Entity
@Table(name = "bill")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Bill implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "billid", nullable = false)
    private Integer billid;

    @NotNull
    @Column(name = "paytype", nullable = false)
    private Integer paytype;

    @NotNull
    @Column(name = "paydate", nullable = false)
    private Instant paydate;

    @NotNull
    @Column(name = "jhi_cost", nullable = false)
    private Integer cost;

    @NotNull
    @Column(name = "custid", nullable = false)
    private Integer custid;

    @NotNull
    @Column(name = "serviceid", nullable = false)
    private Integer serviceid;

    @ManyToOne
    private RoomService roomService;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBillid() {
        return billid;
    }

    public Bill billid(Integer billid) {
        this.billid = billid;
        return this;
    }

    public void setBillid(Integer billid) {
        this.billid = billid;
    }

    public Integer getPaytype() {
        return paytype;
    }

    public Bill paytype(Integer paytype) {
        this.paytype = paytype;
        return this;
    }

    public void setPaytype(Integer paytype) {
        this.paytype = paytype;
    }

    public Instant getPaydate() {
        return paydate;
    }

    public Bill paydate(Instant paydate) {
        this.paydate = paydate;
        return this;
    }

    public void setPaydate(Instant paydate) {
        this.paydate = paydate;
    }

    public Integer getCost() {
        return cost;
    }

    public Bill cost(Integer cost) {
        this.cost = cost;
        return this;
    }

    public void setCost(Integer cost) {
        this.cost = cost;
    }

    public Integer getCustid() {
        return custid;
    }

    public Bill custid(Integer custid) {
        this.custid = custid;
        return this;
    }

    public void setCustid(Integer custid) {
        this.custid = custid;
    }

    public Integer getServiceid() {
        return serviceid;
    }

    public Bill serviceid(Integer serviceid) {
        this.serviceid = serviceid;
        return this;
    }

    public void setServiceid(Integer serviceid) {
        this.serviceid = serviceid;
    }

    public RoomService getRoomService() {
        return roomService;
    }

    public Bill roomService(RoomService roomService) {
        this.roomService = roomService;
        return this;
    }

    public void setRoomService(RoomService roomService) {
        this.roomService = roomService;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Bill bill = (Bill) o;
        if (bill.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), bill.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Bill{" +
            "id=" + getId() +
            ", billid=" + getBillid() +
            ", paytype=" + getPaytype() +
            ", paydate='" + getPaydate() + "'" +
            ", cost=" + getCost() +
            ", custid=" + getCustid() +
            ", serviceid=" + getServiceid() +
            "}";
    }
}
