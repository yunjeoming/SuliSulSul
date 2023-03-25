package com.sul.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.sul.server.service.AlcService;

import lombok.extern.slf4j.Slf4j;

@Controller
@Slf4j
public class AlcController {
	@Autowired
	AlcService service;
	
	@RequestMapping("/")
	public String dummy(){
		log.debug("====dummy start====");
		List<Map<String, Object>> list = new ArrayList(); 
		list = service.selectTotalAlcList();
		return "dummy";
	}
	
	@ResponseBody
	@RequestMapping("/selectAlcList.do")
	public List<Map<String, Object>> selectTotalAlcList(Model model){
		List<Map<String, Object>> list = service.selectTotalAlcList();
		model.addAllAttributes(list);
		return list;
	}
}
