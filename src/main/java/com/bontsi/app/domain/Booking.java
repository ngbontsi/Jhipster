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
    private Bill bill;

    @OneToMany(mappedBy = "booking")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Room> rooms = new HashSet<>();

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

    public Bill getBill() {
        return bill;
    }

    public Booking bill(Bill bill) {
        this.bill = bill;
        return this;
    }

    public void setBill(Bill bill) {
        this.bill = bill;
    }

    public Set<Room> getRooms() {
        return rooms;
    }

    public Booking rooms(Set<Room> rooms) {
        this.rooms = rooms;
        return this;
    }

    public Booking addRoom(Room room) {
        this.rooms.add(room);
        room.setBooking(this);
        return this;
    }

    public Booking removeRoom(Room room) {
        this.rooms.remove(room);
        room.setBooking(null);
        return this;
    }

    public void setRooms(Set<Room> rooms) {
        this.rooms = rooms;
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
