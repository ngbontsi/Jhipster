package com.bontsi.app.service;

import com.bontsi.app.domain.RoomType;
import java.util.List;

/**
 * Service Interface for managing RoomType.
 */
public interface RoomTypeService {

    /**
     * Save a roomType.
     *
     * @param roomType the entity to save
     * @return the persisted entity
     */
    RoomType save(RoomType roomType);

    /**
     * Get all the roomTypes.
     *
     * @return the list of entities
     */
    List<RoomType> findAll();
    /**
     * Get all the RoomTypeDTO where Room is null.
     *
     * @return the list of entities
     */
    List<RoomType> findAllWhereRoomIsNull();

    /**
     * Get the "id" roomType.
     *
     * @param id the id of the entity
     * @return the entity
     */
    RoomType findOne(Long id);

    /**
     * Delete the "id" roomType.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
