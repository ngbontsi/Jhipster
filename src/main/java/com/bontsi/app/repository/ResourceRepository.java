package com.bontsi.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bontsi.app.domain.Resource;

public interface ResourceRepository  extends JpaRepository<Resource, Long>{

}
