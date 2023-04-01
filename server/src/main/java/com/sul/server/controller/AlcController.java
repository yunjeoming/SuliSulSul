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
import com.sul.server.vo.ReviewVo;

@RestController
public class AlcController {
	@Autowired
	AlcService service;
	
	@Autowired
	ReviewService rvService;
	
	@ResponseBody
	@RequestMapping("/selectAlcList.do")
	public List<AlcVo> selectTotalAlcList(AlcVo vo, Model model){
		return service.selectTotalAlcList(vo);
	}
	
	@ResponseBody
	@RequestMapping("/selectAlcDetail.do")
	public Map<String, Object> selectAlcDetail(AlcVo vo, ReviewVo rvVo, Model model){
		Map<String, Object> resultMap = new HashMap<>();
		resultMap.put("alcData", service.selectAlcDetail(vo));
		resultMap.put("reviewData", rvService.selectAlcReviewList(rvVo));
		return resultMap;
	}
}
