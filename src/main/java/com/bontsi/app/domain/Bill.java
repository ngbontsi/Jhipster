package com.bontsi.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
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

    @OneToMany(mappedBy = "bill")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Customer> customers = new HashSet<>();

    @OneToMany(mappedBy = "bill")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<RoomService> roomServices = new HashSet<>();

    @OneToMany(mappedBy = "bill")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Booking> bookings = new HashSet<>();

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

    public Set<Customer> getCustomers() {
        return customers;
    }

    public Bill customers(Set<Customer> customers) {
        this.customers = customers;
        return this;
    }

    public Bill addCustomer(Customer customer) {
        this.customers.add(customer);
        customer.setBill(this);
        return this;
    }

    public Bill removeCustomer(Customer customer) {
        this.customers.remove(customer);
        customer.setBill(null);
        return this;
    }

    public void setCustomers(Set<Customer> customers) {
        this.customers = customers;
    }

    public Set<RoomService> getRoomServices() {
        return roomServices;
    }

    public Bill roomServices(Set<RoomService> roomServices) {
        this.roomServices = roomServices;
        return this;
    }

    public Bill addRoomService(RoomService roomService) {
        this.roomServices.add(roomService);
        roomService.setBill(this);
        return this;
    }

    public Bill removeRoomService(RoomService roomService) {
        this.roomServices.remove(roomService);
        roomService.setBill(null);
        return this;
    }

    public void setRoomServices(Set<RoomService> roomServices) {
        this.roomServices = roomServices;
    }

    public Set<Booking> getBookings() {
        return bookings;
    }

    public Bill bookings(Set<Booking> bookings) {
        this.bookings = bookings;
        return this;
    }

    public Bill addBooking(Booking booking) {
        this.bookings.add(booking);
        booking.setBill(this);
        return this;
    }

    public Bill removeBooking(Booking booking) {
        this.bookings.remove(booking);
        booking.setBill(null);
        return this;
    }

    public void setBookings(Set<Booking> bookings) {
        this.bookings = bookings;
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
