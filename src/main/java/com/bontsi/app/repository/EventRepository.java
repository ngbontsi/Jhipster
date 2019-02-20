package com.bontsi.app.repository;

import org.joda.time.LocalDateTime;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bontsi.app.domain.Event;

public interface EventRepository extends JpaRepository<Event, Long>{

	Iterable<Event> findBetween(LocalDateTime from, LocalDateTime to);

}
