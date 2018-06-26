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
 * A Booking.
 */
@Entity
@Table(name = "booking")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Booking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "datein", nullable = false)
    private Instant datein;

    @NotNull
    @Column(name = "dateout", nullable = false)
    private Instant dateout;

    @ManyToOne
    private Room room;

    @OneToMany(mappedBy = "booking")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Bill> bills = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDatein() {
        return datein;
    }

    public Booking datein(Instant datein) {
        this.datein = datein;
        return this;
    }

    public void setDatein(Instant datein) {
        this.datein = datein;
    }

    public Instant getDateout() {
        return dateout;
    }

    public Booking dateout(Instant dateout) {
        this.dateout = dateout;
        return this;
    }

    public void setDateout(Instant dateout) {
        this.dateout = dateout;
    }

    public Room getRoom() {
        return room;
    }

    public Booking room(Room room) {
        this.room = room;
        return this;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Set<Bill> getBills() {
        return bills;
    }

    public Booking bills(Set<Bill> bills) {
        this.bills = bills;
        return this;
    }

    public Booking addBill(Bill bill) {
        this.bills.add(bill);
        bill.setBooking(this);
        return this;
    }

    public Booking removeBill(Bill bill) {
        this.bills.remove(bill);
        bill.setBooking(null);
        return this;
    }

    public void setBills(Set<Bill> bills) {
        this.bills = bills;
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
        Booking booking = (Booking) o;
        if (booking.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), booking.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Booking{" +
            "id=" + getId() +
            ", datein='" + getDatein() + "'" +
            ", dateout='" + getDateout() + "'" +
            "}";
    }
}
