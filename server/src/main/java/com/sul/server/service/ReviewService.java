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
	
	// 리뷰 전체 목록(하나의 술의)
	public List<ReviewVo> selectAlcReviewList(ReviewVo vo){
		List<ReviewVo> returnVo = new ArrayList<>(); 
		returnVo = mapper.selectAlcReviewList(vo);
		
		return returnVo;
	}
	
	// 리뷰 상세(한개만 보여줌)
	public ReviewVo selectAlcReviewDetail(ReviewVo vo){
		ReviewVo returnVo = new ReviewVo(); 
		returnVo = mapper.selectAlcReviewDetail(vo);
		
		return returnVo;
	}
	
	// 리뷰 등록
	public void insertAlcReview(ReviewVo vo){
		mapper.insertAlcReview(vo);
		updateAvgGrade(vo);
	}
	
	// 리뷰 수정
	public String updateAlcReview(ReviewVo vo){
		String rtnMsg = "";
		if(checkAuth(vo) == 1) {
			mapper.updateAlcReview(vo);
			updateAvgGrade(vo);
			rtnMsg = "SUC";
		} else {
			rtnMsg = "FAIL";
		}
		
		return rtnMsg;
	}
	
	// 리뷰 삭제
	public String deleteAlcReview(ReviewVo vo){
		String rtnMsg = "";
		if(checkAuth(vo) == 1) {
			mapper.deleteAlcReview(vo);
			updateAvgGrade(vo);
			rtnMsg = "SUC";
		} else {
			rtnMsg = "FAIL";
		}
		
		return rtnMsg;
	}
	
	// 리뷰 수정 및 삭제할 때 관리자 권한이거나, 비밀번호 체킹
	private int checkAuth(ReviewVo vo) {
		// result가 0이면 권한 없음, 1이면 권한 있음
		int result = 0;
		
		// 관리자 페이지에서 접근한 경우 userType을 M으로 설정
		if("M".equals(vo.getUserType())) {
			result = 1;
		} else {
			// 입력 된 비밀번호와 등록 된 비밀번호 체킹
			result = mapper.selectCheckPwd(vo);
		}
		
		return result;
	}
	
	// 리뷰 등록, 수정, 삭제 시 GRADE값 산정
	private void updateAvgGrade(ReviewVo vo) {
		int alcNo = mapper.selectAlcNo(vo.getReviewNo());
		vo.setAlcNo(alcNo);
		mapper.mergeAlcReviewGrade(vo);
	}
}
