package com.bontsi.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @Column(name = "description", nullable = false)
    private Integer description;

    @OneToOne(mappedBy = "roomType")
    @JsonIgnore
    private Room room;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getDescription() {
        return description;
    }

    public RoomType description(Integer description) {
        this.description = description;
        return this;
    }

    public void setDescription(Integer description) {
        this.description = description;
    }

    public Room getRoom() {
        return room;
    }

    public RoomType room(Room room) {
        this.room = room;
        return this;
    }

    public void setRoom(Room room) {
        this.room = room;
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
            ", description=" + getDescription() +
            "}";
    }
}
