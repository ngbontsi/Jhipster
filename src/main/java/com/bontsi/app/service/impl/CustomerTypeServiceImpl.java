package com.bontsi.app.service.impl;

import com.bontsi.app.service.CustomerTypeService;
import com.bontsi.app.domain.CustomerType;
import com.bontsi.app.repository.CustomerTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing CustomerType.
 */
@Service
@Transactional
public class CustomerTypeServiceImpl implements CustomerTypeService {

    private final Logger log = LoggerFactory.getLogger(CustomerTypeServiceImpl.class);

    private final CustomerTypeRepository customerTypeRepository;

    public CustomerTypeServiceImpl(CustomerTypeRepository customerTypeRepository) {
        this.customerTypeRepository = customerTypeRepository;
    }

    /**
     * Save a customerType.
     *
     * @param customerType the entity to save
     * @return the persisted entity
     */
    @Override
    public CustomerType save(CustomerType customerType) {
        log.debug("Request to save CustomerType : {}", customerType);
        return customerTypeRepository.save(customerType);
    }

    /**
     * Get all the customerTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<CustomerType> findAll() {
        log.debug("Request to get all CustomerTypes");
        return customerTypeRepository.findAll();
    }


    /**
     *  get all the customerTypes where Customer is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<CustomerType> findAllWhereCustomerIsNull() {
        log.debug("Request to get all customerTypes where Customer is null");
        return StreamSupport
            .stream(customerTypeRepository.findAll().spliterator(), false)
            .filter(customerType -> customerType.getCustomer() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one customerType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public CustomerType findOne(Long id) {
        log.debug("Request to get CustomerType : {}", id);
        return customerTypeRepository.findOne(id);
    }

    /**
     * Delete the customerType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete CustomerType : {}", id);
        customerTypeRepository.delete(id);
    }
}
