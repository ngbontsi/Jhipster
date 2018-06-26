package com.bontsi.app.service;

import com.bontsi.app.domain.Booking;
import java.util.List;

/**
 * Service Interface for managing Booking.
 */
public interface BookingService {

    /**
     * Save a booking.
     *
     * @param booking the entity to save
     * @return the persisted entity
     */
    Booking save(Booking booking);

    /**
     * Get all the bookings.
     *
     * @return the list of entities
     */
    List<Booking> findAll();

    /**
     * Get the "id" booking.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Booking findOne(Long id);

    /**
     * Delete the "id" booking.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
