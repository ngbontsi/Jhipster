package com.bontsi.app.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CustomerType.
 */
@Entity
@Table(name = "customer_type")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomerType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "custtype", nullable = false)
    private Integer custtype;

    @NotNull
    @Column(name = "description", nullable = false)
    private String description;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getCusttype() {
        return custtype;
    }

    public CustomerType custtype(Integer custtype) {
        this.custtype = custtype;
        return this;
    }

    public void setCusttype(Integer custtype) {
        this.custtype = custtype;
    }

    public String getDescription() {
        return description;
    }

    public CustomerType description(String description) {
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
        CustomerType customerType = (CustomerType) o;
        if (customerType.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerType.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerType{" +
            "id=" + getId() +
            ", custtype=" + getCusttype() +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
