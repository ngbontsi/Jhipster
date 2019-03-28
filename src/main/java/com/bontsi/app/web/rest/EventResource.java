package com.bontsi.app.web.rest;

import java.util.List;

import org.joda.time.LocalDateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.bontsi.app.domain.Event;
import com.bontsi.app.domain.Resource;
import com.bontsi.app.repository.EventRepository;
import com.bontsi.app.repository.ResourceRepository;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@RestController
public class EventResource {

	@Autowired
	EventRepository eventRepository;

	@Autowired
	ResourceRepository resourceRepository;

	@RequestMapping("/api")
	@ResponseBody
	String home() {
		return "Welcome!";
	}

	@RequestMapping("/api/resources")
	List<Resource> resources() {
		return resourceRepository.findAll();
	}

	@GetMapping("/api/events")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	List<Event> events(@RequestParam("from") @DateTimeFormat(iso=ISO.DATE_TIME) LocalDateTime from, @RequestParam("to") @DateTimeFormat(iso=ISO.DATE_TIME) LocalDateTime to) {
		return eventRepository.findByEndBetween(from, to);
	}

}
