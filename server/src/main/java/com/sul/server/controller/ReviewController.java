package com.sul.server.controller;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sul.server.service.ReviewService;
import com.sul.server.vo.ReviewVo;

@RestController
public class ReviewController {
	@Autowired
	ReviewService service;
	
	// 전체리뷰 목록(하나의 술의)
	@ResponseBody
	@RequestMapping("/selectReviewList")
	public List<ReviewVo> selectAlcReviewList(ReviewVo vo, Model model){
		return service.selectAlcReviewList(vo);
	}
	
	// 리뷰 상세(한 개만 보여줌)
	@ResponseBody
	@RequestMapping("/selectReviewDetail")
	public ReviewVo selectAlcDetail(ReviewVo vo, Model model){
		return service.selectAlcReviewDetail(vo);
	}
	
	// 리뷰 등록
	@ResponseBody
	@RequestMapping("/insertAlcReview")
	public String insertAlcReview(ReviewVo vo, Model model){
		String rtnMsg = "SUC";
		try {
			service.insertAlcReview(vo);
		} catch(Exception e) {
			rtnMsg = "FAIL";
		}
		return rtnMsg;
	}
	
	// 리뷰 수정
	@ResponseBody
	@RequestMapping("/updateAlcReview")
	public String updateAlcReview(ReviewVo vo, Model model){
		String rtnMsg = "SUC";
		try {
			service.updateAlcReview(vo);
		} catch(Exception e) {
			rtnMsg = "FAIL";
		}
		return rtnMsg;
	}
	
	// 리뷰 삭제
	@ResponseBody
	@RequestMapping("/deleteAlcReview")
	public String deleteAlcReview(ReviewVo vo, Model model){
		String rtnMsg = "SUC";
		try {
			service.deleteAlcReview(vo);
		} catch(Exception e) {
			rtnMsg = "FAIL";
		}
		return rtnMsg;
	}
	
	// 비밀번호 체크
	@ResponseBody
	@RequestMapping("/checkPassword")
	public String selectAlcDetail(ReviewVo vo){
		String pwd = new String(Base64.getEncoder().encodeToString(vo.getReviewPwd().getBytes()));
		vo.setReviewPwd(pwd);
		
		int chk = service.checkAuth(vo);
		String rtnMsg = "FAIL";
		if(chk == 1) {
			rtnMsg = "SUC";
		}
		return rtnMsg;
	}
}
