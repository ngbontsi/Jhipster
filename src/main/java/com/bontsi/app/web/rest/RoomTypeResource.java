package com.bontsi.app.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.bontsi.app.domain.RoomType;

import com.bontsi.app.repository.RoomTypeRepository;
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
 * REST controller for managing RoomType.
 */
@RestController
@RequestMapping("/api")
public class RoomTypeResource {

    private final Logger log = LoggerFactory.getLogger(RoomTypeResource.class);

    private static final String ENTITY_NAME = "roomType";

    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeResource(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    /**
     * POST  /room-types : Create a new roomType.
     *
     * @param roomType the roomType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new roomType, or with status 400 (Bad Request) if the roomType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/room-types")
    @Timed
    public ResponseEntity<RoomType> createRoomType(@Valid @RequestBody RoomType roomType) throws URISyntaxException {
        log.debug("REST request to save RoomType : {}", roomType);
        if (roomType.getId() != null) {
            throw new BadRequestAlertException("A new roomType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        RoomType result = roomTypeRepository.save(roomType);
        return ResponseEntity.created(new URI("/api/room-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /room-types : Updates an existing roomType.
     *
     * @param roomType the roomType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated roomType,
     * or with status 400 (Bad Request) if the roomType is not valid,
     * or with status 500 (Internal Server Error) if the roomType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/room-types")
    @Timed
    public ResponseEntity<RoomType> updateRoomType(@Valid @RequestBody RoomType roomType) throws URISyntaxException {
        log.debug("REST request to update RoomType : {}", roomType);
        if (roomType.getId() == null) {
            return createRoomType(roomType);
        }
        RoomType result = roomTypeRepository.save(roomType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, roomType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /room-types : get all the roomTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of roomTypes in body
     */
    @GetMapping("/room-types")
    @Timed
    public List<RoomType> getAllRoomTypes() {
        log.debug("REST request to get all RoomTypes");
        return roomTypeRepository.findAll();
        }

    /**
     * GET  /room-types/:id : get the "id" roomType.
     *
     * @param id the id of the roomType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the roomType, or with status 404 (Not Found)
     */
    @GetMapping("/room-types/{id}")
    @Timed
    public ResponseEntity<RoomType> getRoomType(@PathVariable Long id) {
        log.debug("REST request to get RoomType : {}", id);
        RoomType roomType = roomTypeRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(roomType));
    }

    /**
     * DELETE  /room-types/:id : delete the "id" roomType.
     *
     * @param id the id of the roomType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/room-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteRoomType(@PathVariable Long id) {
        log.debug("REST request to delete RoomType : {}", id);
        roomTypeRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
