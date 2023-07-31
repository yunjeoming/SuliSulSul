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
		// 페이지 설정
		vo.setStartPage(vo.getPageNo() * 10);
		
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
	
	// 파일 조회
	public AlcVo selectFileInfo(AlcVo vo){
		return mapper.selectFileInfo(vo);
	}
	
	// 술 등록
	public void insertAlcInfo(AlcVo vo){
		mapper.insertAlcInfo(vo);
	}
	
	// 술 삭제
	public void updateAlcInfo(AlcVo vo){
		mapper.updateAlcInfo(vo);
	}
	
	// 술 수정
	public void deleteAlcInfo(AlcVo vo){
		mapper.deleteAlcInfo(vo);
	}
	
	// 술 단종(단종 여부만 업데이트)
	public void updateAlcExp(AlcVo vo){
		mapper.updateAlcExp(vo);
	}
	
	// 파일 저장(술에도 파일 정보 업데이트)
	public void insertFileInfo(AlcVo vo){
		mapper.insertFileInfo(vo);
		mapper.updateAlcFileInfo(vo);
	}
	
	// 파일 삭제
	public void deleteFileInfo(AlcVo vo){
		mapper.deleteFileInfo(vo);
	}
}
