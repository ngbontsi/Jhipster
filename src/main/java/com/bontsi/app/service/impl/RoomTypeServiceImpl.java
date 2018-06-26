package com.bontsi.app.service.impl;

import com.bontsi.app.service.RoomTypeService;
import com.bontsi.app.domain.RoomType;
import com.bontsi.app.repository.RoomTypeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing RoomType.
 */
@Service
@Transactional
public class RoomTypeServiceImpl implements RoomTypeService {

    private final Logger log = LoggerFactory.getLogger(RoomTypeServiceImpl.class);

    private final RoomTypeRepository roomTypeRepository;

    public RoomTypeServiceImpl(RoomTypeRepository roomTypeRepository) {
        this.roomTypeRepository = roomTypeRepository;
    }

    /**
     * Save a roomType.
     *
     * @param roomType the entity to save
     * @return the persisted entity
     */
    @Override
    public RoomType save(RoomType roomType) {
        log.debug("Request to save RoomType : {}", roomType);
        return roomTypeRepository.save(roomType);
    }

    /**
     * Get all the roomTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<RoomType> findAll() {
        log.debug("Request to get all RoomTypes");
        return roomTypeRepository.findAll();
    }


    /**
     *  get all the roomTypes where Room is null.
     *  @return the list of entities
     */
    @Transactional(readOnly = true) 
    public List<RoomType> findAllWhereRoomIsNull() {
        log.debug("Request to get all roomTypes where Room is null");
        return StreamSupport
            .stream(roomTypeRepository.findAll().spliterator(), false)
            .filter(roomType -> roomType.getRoom() == null)
            .collect(Collectors.toList());
    }

    /**
     * Get one roomType by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public RoomType findOne(Long id) {
        log.debug("Request to get RoomType : {}", id);
        return roomTypeRepository.findOne(id);
    }

    /**
     * Delete the roomType by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete RoomType : {}", id);
        roomTypeRepository.delete(id);
    }
}
