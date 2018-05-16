package com.bontsi.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
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
    @Column(name = "bookid", nullable = false)
    private Integer bookid;

    @NotNull
    @Column(name = "datein", nullable = false)
    private Instant datein;

    @NotNull
    @Column(name = "dateout", nullable = false)
    private Instant dateout;

    @NotNull
    @Column(name = "roomid", nullable = false)
    private Integer roomid;

    @NotNull
    @Column(name = "custid", nullable = false)
    private Integer custid;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getBookid() {
        return bookid;
    }

    public Booking bookid(Integer bookid) {
        this.bookid = bookid;
        return this;
    }

    public void setBookid(Integer bookid) {
        this.bookid = bookid;
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

    public Integer getRoomid() {
        return roomid;
    }

    public Booking roomid(Integer roomid) {
        this.roomid = roomid;
        return this;
    }

    public void setRoomid(Integer roomid) {
        this.roomid = roomid;
    }

    public Integer getCustid() {
        return custid;
    }

    public Booking custid(Integer custid) {
        this.custid = custid;
        return this;
    }

    public void setCustid(Integer custid) {
        this.custid = custid;
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
            ", bookid=" + getBookid() +
            ", datein='" + getDatein() + "'" +
            ", dateout='" + getDateout() + "'" +
            ", roomid=" + getRoomid() +
            ", custid=" + getCustid() +
            "}";
    }
}
