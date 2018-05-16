package com.bontsi.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A RoomService.
 */
@Entity
@Table(name = "room_service")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class RoomService implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "serviceid", nullable = false)
    private Integer serviceid;

    @NotNull
    @Size(max = 45)
    @Column(name = "description", length = 45, nullable = false)
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getServiceid() {
        return serviceid;
    }

    public RoomService serviceid(Integer serviceid) {
        this.serviceid = serviceid;
        return this;
    }

    public void setServiceid(Integer serviceid) {
        this.serviceid = serviceid;
    }

    public String getDescription() {
        return description;
    }

    public RoomService description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
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
        RoomService roomService = (RoomService) o;
        if (roomService.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), roomService.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "RoomService{" +
            "id=" + getId() +
            ", serviceid=" + getServiceid() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
