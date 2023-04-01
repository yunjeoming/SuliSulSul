package com.sul.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sul.server.mapper.AlcMapper;
import com.sul.server.mapper.ReviewMapper;
import com.sul.server.vo.AlcVo;
import com.sul.server.vo.ReviewVo;

import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
public class ReviewService {
	@Autowired
	ReviewMapper mapper;
	
	public List<ReviewVo> selectAlcReviewList(ReviewVo vo){
		List<ReviewVo> returnVo = new ArrayList<>(); 
		returnVo = mapper.selectAlcReviewList(vo);
		
		return returnVo;
	}
	
	public ReviewVo selectAlcReviewDetail(ReviewVo vo){
		ReviewVo returnVo = new ReviewVo(); 
		returnVo = mapper.selectAlcReviewDetail(vo);
		
		return returnVo;
	}
}
