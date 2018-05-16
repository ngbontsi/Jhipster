package com.bontsi.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RoomType.
 */
@Entity
@Table(name = "room_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RoomType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "roomtype", nullable = false)
    private Integer roomtype;

    @NotNull
    @Size(max = 45)
    @Column(name = "description", length = 45, nullable = false)
    private String description;

    @NotNull
    @Column(name = "rates", nullable = false)
    private Integer rates;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getRoomtype() {
        return roomtype;
    }

    public RoomType roomtype(Integer roomtype) {
        this.roomtype = roomtype;
        return this;
    }

    public void setRoomtype(Integer roomtype) {
        this.roomtype = roomtype;
    }

    public String getDescription() {
        return description;
    }

    public RoomType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRates() {
        return rates;
    }

    public RoomType rates(Integer rates) {
        this.rates = rates;
        return this;
    }

    public void setRates(Integer rates) {
        this.rates = rates;
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
        RoomType roomType = (RoomType) o;
        if (roomType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), roomType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RoomType{" +
            "id=" + getId() +
            ", roomtype=" + getRoomtype() +
            ", description='" + getDescription() + "'" +
            ", rates=" + getRates() +
            "}";
    }
}
