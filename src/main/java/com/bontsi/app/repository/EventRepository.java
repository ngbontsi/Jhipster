package com.bontsi.app.repository;

import java.util.List;

import org.joda.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bontsi.app.domain.Event;

public interface EventRepository extends JpaRepository<Event, Long >{

	List<Event> findByEndBetween(LocalDateTime from, LocalDateTime to);

}
