package com.bontsi.app.service;

import com.bontsi.app.domain.Room;
import java.util.List;

/**
 * Service Interface for managing Room.
 */
public interface RoomService {

    /**
     * Save a room.
     *
     * @param room the entity to save
     * @return the persisted entity
     */
    Room save(Room room);

    /**
     * Get all the rooms.
     *
     * @return the list of entities
     */
    List<Room> findAll();

    /**
     * Get the "id" room.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Room findOne(Long id);

    /**
     * Delete the "id" room.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
