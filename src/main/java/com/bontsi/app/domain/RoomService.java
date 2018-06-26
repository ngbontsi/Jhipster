package com.bontsi.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
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
    @Column(name = "description", nullable = false)
    private Integer description;

    @OneToMany(mappedBy = "roomService")
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

    public Integer getDescription() {
        return description;
    }

    public RoomService description(Integer description) {
        this.description = description;
        return this;
    }

    public void setDescription(Integer description) {
        this.description = description;
    }

    public Set<Bill> getBills() {
        return bills;
    }

    public RoomService bills(Set<Bill> bills) {
        this.bills = bills;
        return this;
    }

    public RoomService addBill(Bill bill) {
        this.bills.add(bill);
        bill.setRoomService(this);
        return this;
    }

    public RoomService removeBill(Bill bill) {
        this.bills.remove(bill);
        bill.setRoomService(null);
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
            ", description=" + getDescription() +
            "}";
    }
}
