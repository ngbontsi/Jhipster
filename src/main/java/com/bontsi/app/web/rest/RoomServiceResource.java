package com.bontsi.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bontsi.app.domain.RoomService;
import com.bontsi.app.service.RoomServiceService;
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

/**
 * REST controller for managing RoomService.
 */
@RestController
@RequestMapping("/api")
public class RoomServiceResource {

    private final Logger log = LoggerFactory.getLogger(RoomServiceResource.class);

    private static final String ENTITY_NAME = "roomService";

    private final RoomServiceService roomServiceService;

    public RoomServiceResource(RoomServiceService roomServiceService) {
        this.roomServiceService = roomServiceService;
    }

    /**
     * POST  /room-services : Create a new roomService.
     *
     * @param roomService the roomService to create
     * @return the ResponseEntity with status 201 (Created) and with body the new roomService, or with status 400 (Bad Request) if the roomService has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/room-services")
    @Timed
    public ResponseEntity<RoomService> createRoomService(@Valid @RequestBody RoomService roomService) throws URISyntaxException {
        log.debug("REST request to save RoomService : {}", roomService);
        if (roomService.getId() != null) {
            throw new BadRequestAlertException("A new roomService cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoomService result = roomServiceService.save(roomService);
        return ResponseEntity.created(new URI("/api/room-services/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /room-services : Updates an existing roomService.
     *
     * @param roomService the roomService to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated roomService,
     * or with status 400 (Bad Request) if the roomService is not valid,
     * or with status 500 (Internal Server Error) if the roomService couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/room-services")
    @Timed
    public ResponseEntity<RoomService> updateRoomService(@Valid @RequestBody RoomService roomService) throws URISyntaxException {
        log.debug("REST request to update RoomService : {}", roomService);
        if (roomService.getId() == null) {
            return createRoomService(roomService);
        }
        RoomService result = roomServiceService.save(roomService);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, roomService.getId().toString()))
            .body(result);
    }

    /**
     * GET  /room-services : get all the roomServices.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of roomServices in body
     */
    @GetMapping("/room-services")
    @Timed
    public List<RoomService> getAllRoomServices() {
        log.debug("REST request to get all RoomServices");
        return roomServiceService.findAll();
        }

    /**
     * GET  /room-services/:id : get the "id" roomService.
     *
     * @param id the id of the roomService to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the roomService, or with status 404 (Not Found)
     */
    @GetMapping("/room-services/{id}")
    @Timed
    public ResponseEntity<RoomService> getRoomService(@PathVariable Long id) {
        log.debug("REST request to get RoomService : {}", id);
        RoomService roomService = roomServiceService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(roomService));
    }

    /**
     * DELETE  /room-services/:id : delete the "id" roomService.
     *
     * @param id the id of the roomService to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/room-services/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoomService(@PathVariable Long id) {
        log.debug("REST request to delete RoomService : {}", id);
        roomServiceService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
