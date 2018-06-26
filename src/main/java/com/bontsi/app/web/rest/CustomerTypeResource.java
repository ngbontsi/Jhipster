package com.bontsi.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bontsi.app.domain.CustomerType;
import com.bontsi.app.service.CustomerTypeService;
import com.bontsi.app.web.rest.errors.BadRequestAlertException;
import com.bontsi.app.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

/**
 * REST controller for managing CustomerType.
 */
@RestController
@RequestMapping("/api")
public class CustomerTypeResource {

    private final Logger log = LoggerFactory.getLogger(CustomerTypeResource.class);

    private static final String ENTITY_NAME = "customerType";

    private final CustomerTypeService customerTypeService;

    public CustomerTypeResource(CustomerTypeService customerTypeService) {
        this.customerTypeService = customerTypeService;
    }

    /**
     * POST  /customer-types : Create a new customerType.
     *
     * @param customerType the customerType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerType, or with status 400 (Bad Request) if the customerType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-types")
    @Timed
    public ResponseEntity<CustomerType> createCustomerType(@Valid @RequestBody CustomerType customerType) throws URISyntaxException {
        log.debug("REST request to save CustomerType : {}", customerType);
        if (customerType.getId() != null) {
            throw new BadRequestAlertException("A new customerType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerType result = customerTypeService.save(customerType);
        return ResponseEntity.created(new URI("/api/customer-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-types : Updates an existing customerType.
     *
     * @param customerType the customerType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerType,
     * or with status 400 (Bad Request) if the customerType is not valid,
     * or with status 500 (Internal Server Error) if the customerType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-types")
    @Timed
    public ResponseEntity<CustomerType> updateCustomerType(@Valid @RequestBody CustomerType customerType) throws URISyntaxException {
        log.debug("REST request to update CustomerType : {}", customerType);
        if (customerType.getId() == null) {
            return createCustomerType(customerType);
        }
        CustomerType result = customerTypeService.save(customerType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-types : get all the customerTypes.
     *
     * @param filter the filter of the request
     * @return the ResponseEntity with status 200 (OK) and the list of customerTypes in body
     */
    @GetMapping("/customer-types")
    @Timed
    public List<CustomerType> getAllCustomerTypes(@RequestParam(required = false) String filter) {
        if ("customer-is-null".equals(filter)) {
            log.debug("REST request to get all CustomerTypes where customer is null");
            return customerTypeService.findAllWhereCustomerIsNull();
        }
        log.debug("REST request to get all CustomerTypes");
        return customerTypeService.findAll();
        }

    /**
     * GET  /customer-types/:id : get the "id" customerType.
     *
     * @param id the id of the customerType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerType, or with status 404 (Not Found)
     */
    @GetMapping("/customer-types/{id}")
    @Timed
    public ResponseEntity<CustomerType> getCustomerType(@PathVariable Long id) {
        log.debug("REST request to get CustomerType : {}", id);
        CustomerType customerType = customerTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(customerType));
    }

    /**
     * DELETE  /customer-types/:id : delete the "id" customerType.
     *
     * @param id the id of the customerType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteCustomerType(@PathVariable Long id) {
        log.debug("REST request to delete CustomerType : {}", id);
        customerTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
