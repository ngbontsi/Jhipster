package com.bontsi.app.service;

import com.bontsi.app.domain.RoomService;
import java.util.List;

/**
 * Service Interface for managing RoomService.
 */
public interface RoomServiceService {

    /**
     * Save a roomService.
     *
     * @param roomService the entity to save
     * @return the persisted entity
     */
    RoomService save(RoomService roomService);

    /**
     * Get all the roomServices.
     *
     * @return the list of entities
     */
    List<RoomService> findAll();

    /**
     * Get the "id" roomService.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RoomService findOne(Long id);

    /**
     * Delete the "id" roomService.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
