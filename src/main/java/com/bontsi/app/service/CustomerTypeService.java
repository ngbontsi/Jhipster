package com.bontsi.app.service;

import com.bontsi.app.domain.CustomerType;
import java.util.List;

/**
 * Service Interface for managing CustomerType.
 */
public interface CustomerTypeService {

    /**
     * Save a customerType.
     *
     * @param customerType the entity to save
     * @return the persisted entity
     */
    CustomerType save(CustomerType customerType);

    /**
     * Get all the customerTypes.
     *
     * @return the list of entities
     */
    List<CustomerType> findAll();
    /**
     * Get all the CustomerTypeDTO where Customer is null.
     *
     * @return the list of entities
     */
    List<CustomerType> findAllWhereCustomerIsNull();

    /**
     * Get the "id" customerType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    CustomerType findOne(Long id);

    /**
     * Delete the "id" customerType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
