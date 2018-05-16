package com.bontsi.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "cusid", nullable = false)
    private Integer cusid;

    @NotNull
    @Size(max = 45)
    @Column(name = "name", length = 45, nullable = false)
    private String name;

    @NotNull
    @Size(max = 45)
    @Column(name = "surname", length = 45, nullable = false)
    private String surname;

    @Size(max = 45)
    @Column(name = "email", length = 45)
    private String email;

    @NotNull
    @Column(name = "custtype", nullable = false)
    private Integer custtype;

    @ManyToOne
    private Booking booking;

    @ManyToOne
    private Bill bill;

    @ManyToOne
    private CustomerType customerType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCusid() {
        return cusid;
    }

    public Customer cusid(Integer cusid) {
        this.cusid = cusid;
        return this;
    }

    public void setCusid(Integer cusid) {
        this.cusid = cusid;
    }

    public String getName() {
        return name;
    }

    public Customer name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public Customer surname(String surname) {
        this.surname = surname;
        return this;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public Customer email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getCusttype() {
        return custtype;
    }

    public Customer custtype(Integer custtype) {
        this.custtype = custtype;
        return this;
    }

    public void setCusttype(Integer custtype) {
        this.custtype = custtype;
    }

    public Booking getBooking() {
        return booking;
    }

    public Customer booking(Booking booking) {
        this.booking = booking;
        return this;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public Bill getBill() {
        return bill;
    }

    public Customer bill(Bill bill) {
        this.bill = bill;
        return this;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public CustomerType getCustomerType() {
        return customerType;
    }

    public Customer customerType(CustomerType customerType) {
        this.customerType = customerType;
        return this;
    }

    public void setCustomerType(CustomerType customerType) {
        this.customerType = customerType;
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
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", cusid=" + getCusid() +
            ", name='" + getName() + "'" +
            ", surname='" + getSurname() + "'" +
            ", email='" + getEmail() + "'" +
            ", custtype=" + getCusttype() +
            "}";
    }
}
