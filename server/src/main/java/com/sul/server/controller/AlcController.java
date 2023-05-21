package com.sul.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.sul.server.service.AlcService;
import com.sul.server.service.ReviewService;
import com.sul.server.vo.AlcVo;
import com.sul.server.vo.CategoryVo;
import com.sul.server.vo.ReviewVo;

@RestController
public class AlcController {
	@Autowired
	AlcService service;
	
	@Autowired
	ReviewService rvService;
	
	// 술 목록
	@ResponseBody
	@RequestMapping("/selectAlcList")
	public List<AlcVo> selectTotalAlcList(AlcVo vo, Model model){
		return service.selectTotalAlcList(vo);
	}
	
	// 술 상세
	@ResponseBody
	@RequestMapping("/selectAlcDetail")
	public Map<String, Object> selectAlcDetail(AlcVo vo, ReviewVo rvVo, Model model){
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("alcData", service.selectAlcDetail(vo));
		resultMap.put("reviewData", rvService.selectAlcReviewList(rvVo));
		return resultMap;
	}
	
	// 카테고리 
	@ResponseBody
	@RequestMapping("/selectCateList")
	public List<CategoryVo> selectCategoryList(){
		return service.selectCateList();
	}
	
	// 술 등록
	
	// 술 삭제
	
	// 술 수정
	
	// 술 단종(단종 여부만 업데이트)
}
