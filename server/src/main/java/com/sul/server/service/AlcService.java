package com.sul.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sul.server.mapper.AlcMapper;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@Slf4j
public class AlcService {
	@Autowired
	AlcMapper mapper;
	
	public List<Map<String, Object>> selectTotalAlcList(){
		List<Map<String, Object>> list = new ArrayList(); 
		list = mapper.selectTotalAlcList();
		log.debug("====selectTotalAlcList query:"+list.toString());
		
		return list;
	}
}
