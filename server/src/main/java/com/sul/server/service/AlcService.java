package com.sul.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sul.server.mapper.AlcMapper;
import com.sul.server.vo.AlcVo;
import com.sul.server.vo.CategoryVo;

@Service
@Transactional
public class AlcService {
	@Autowired
	AlcMapper mapper;
	
	// 술 전체 목록
	public List<AlcVo> selectTotalAlcList(AlcVo vo){
		return mapper.selectTotalAlcList(vo);
	}
	
	// 술 상세
	public AlcVo selectAlcDetail(AlcVo vo){
		return mapper.selectAlcDetail(vo);
	}
	
	// 카테고리 목록
	public List<CategoryVo> selectCateList(){
		return mapper.selectCateList();
	}
	
	// 술 등록
	
	// 술 삭제
	
	// 술 수정
	
	// 술 단종(단종 여부만 업데이트)
}
