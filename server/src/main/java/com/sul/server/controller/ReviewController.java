package com.sul.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sul.server.service.ReviewService;
import com.sul.server.vo.AlcVo;
import com.sul.server.vo.ReviewVo;

@RestController
public class ReviewController {
	@Autowired
	ReviewService service;
	
	@ResponseBody
	@RequestMapping("/selectReviewList.do")
	public List<ReviewVo> selectTotalAlcList(ReviewVo vo, Model model){
		return service.selectAlcReviewList(vo);
	}
	
	@ResponseBody
	@RequestMapping("/selectReviewDetail.do")
	public ReviewVo selectAlcDetail(ReviewVo vo, Model model){
		return service.selectAlcReviewDetail(vo);
	}
}
