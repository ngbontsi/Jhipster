package com.bontsi.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Room.
 */
@Entity
@Table(name = "room")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Room implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "roomid", nullable = false)
    private Integer roomid;

    @NotNull
    @Column(name = "roomtype", nullable = false)
    private Integer roomtype;

    @Column(name = "is_reserved")
    private Boolean isReserved;

    @ManyToOne
    private Booking booking;

    @ManyToOne
    private RoomType roomType;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRoomid() {
        return roomid;
    }

    public Room roomid(Integer roomid) {
        this.roomid = roomid;
        return this;
    }

    public void setRoomid(Integer roomid) {
        this.roomid = roomid;
    }

    public Integer getRoomtype() {
        return roomtype;
    }

    public Room roomtype(Integer roomtype) {
        this.roomtype = roomtype;
        return this;
    }

    public void setRoomtype(Integer roomtype) {
        this.roomtype = roomtype;
    }

    public Boolean isIsReserved() {
        return isReserved;
    }

    public Room isReserved(Boolean isReserved) {
        this.isReserved = isReserved;
        return this;
    }

    public void setIsReserved(Boolean isReserved) {
        this.isReserved = isReserved;
    }

    public Booking getBooking() {
        return booking;
    }

    public Room booking(Booking booking) {
        this.booking = booking;
        return this;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public RoomType getRoomType() {
        return roomType;
    }

    public Room roomType(RoomType roomType) {
        this.roomType = roomType;
        return this;
    }

    public void setRoomType(RoomType roomType) {
        this.roomType = roomType;
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
        Room room = (Room) o;
        if (room.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), room.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Room{" +
            "id=" + getId() +
            ", roomid=" + getRoomid() +
            ", roomtype=" + getRoomtype() +
            ", isReserved='" + isIsReserved() + "'" +
            "}";
    }
}
