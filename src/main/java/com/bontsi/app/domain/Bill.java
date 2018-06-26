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
    @Column(name = "paytype", nullable = false)
    private Integer paytype;

    @NotNull
    @Column(name = "paydate", nullable = false)
    private Instant paydate;

    @NotNull
    @Column(name = "billcost", nullable = false)
    private Integer billcost;

    @ManyToOne
    private Customer customer;

    @ManyToOne
    private RoomService roomService;

    @ManyToOne
    private Booking booking;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getBillcost() {
        return billcost;
    }

    public Bill billcost(Integer billcost) {
        this.billcost = billcost;
        return this;
    }

    public void setBillcost(Integer billcost) {
        this.billcost = billcost;
    }

    public Customer getCustomer() {
        return customer;
    }

    public Bill customer(Customer customer) {
        this.customer = customer;
        return this;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
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

    public Booking getBooking() {
        return booking;
    }

    public Bill booking(Booking booking) {
        this.booking = booking;
        return this;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
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
            ", paytype=" + getPaytype() +
            ", paydate='" + getPaydate() + "'" +
            ", billcost=" + getBillcost() +
            "}";
    }
}
