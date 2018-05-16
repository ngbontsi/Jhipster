package com.bontsi.app.repository;

import com.bontsi.app.domain.RoomType;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the RoomType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RoomTypeRepository extends JpaRepository<RoomType, Long> {

}
