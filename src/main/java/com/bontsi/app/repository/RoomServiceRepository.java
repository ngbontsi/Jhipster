package com.bontsi.app.repository;

import com.bontsi.app.domain.RoomService;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RoomService entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoomServiceRepository extends JpaRepository<RoomService, Long> {

}
