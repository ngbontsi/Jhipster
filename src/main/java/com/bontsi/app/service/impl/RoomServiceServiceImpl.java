package com.bontsi.app.service.impl;

import com.bontsi.app.service.RoomServiceService;
import com.bontsi.app.domain.RoomService;
import com.bontsi.app.repository.RoomServiceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Service Implementation for managing RoomService.
 */
@Service
@Transactional
public class RoomServiceServiceImpl implements RoomServiceService {

    private final Logger log = LoggerFactory.getLogger(RoomServiceServiceImpl.class);

    private final RoomServiceRepository roomServiceRepository;

    public RoomServiceServiceImpl(RoomServiceRepository roomServiceRepository) {
        this.roomServiceRepository = roomServiceRepository;
    }

    /**
     * Save a roomService.
     *
     * @param roomService the entity to save
     * @return the persisted entity
     */
    @Override
    public RoomService save(RoomService roomService) {
        log.debug("Request to save RoomService : {}", roomService);
        return roomServiceRepository.save(roomService);
    }

    /**
     * Get all the roomServices.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RoomService> findAll() {
        log.debug("Request to get all RoomServices");
        return roomServiceRepository.findAll();
    }

    /**
     * Get one roomService by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RoomService findOne(Long id) {
        log.debug("Request to get RoomService : {}", id);
        return roomServiceRepository.findOne(id);
    }

    /**
     * Delete the roomService by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RoomService : {}", id);
        roomServiceRepository.delete(id);
    }
}
