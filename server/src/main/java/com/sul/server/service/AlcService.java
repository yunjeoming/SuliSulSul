package com.sul.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sul.server.mapper.AlcMapper;
import com.sul.server.vo.AlcVo;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
public class AlcService {
	@Autowired
	AlcMapper mapper;
	
	// 술 전체 목록
	public List<AlcVo> selectTotalAlcList(AlcVo vo){
		List<AlcVo> returnVo = new ArrayList<>(); 
		returnVo = mapper.selectTotalAlcList(vo);
		
		return returnVo;
	}
	
	// 술 상세
	public AlcVo selectAlcDetail(AlcVo vo){
		AlcVo returnVo = new AlcVo(); 
		returnVo = mapper.selectAlcDetail(vo);
		
		return returnVo;
	}
	
	// 술 등록
	
	// 술 삭제
	
	// 술 수정
	
	// 술 단종(단종 여부만 업데이트)
}
