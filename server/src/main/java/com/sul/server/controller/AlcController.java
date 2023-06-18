package com.sul.server.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	
	@Value("${part4.upload.path}")
	private String uploadPath;
	
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
	@ResponseBody
	@RequestMapping("/insertAlcInfo")
	public void insertAlcInfo(AlcVo vo){
		service.insertAlcInfo(vo);
	}
	
	// 술 삭제
	@ResponseBody
	@RequestMapping("/deleteAlcInfo")
	public void deleteAlcInfo(AlcVo vo){
		service.deleteAlcInfo(vo);
	}
	
	// 술 수정
	@ResponseBody
	@RequestMapping("/updateAlcInfo")
	public void updateAlcInfo(AlcVo vo){
		service.updateAlcInfo(vo);
	}
	
	// 술 단종(단종 여부만 업데이트)
	@ResponseBody
	@RequestMapping("/updateAlcExp")
	public void updateAlcExp(AlcVo vo){
		service.updateAlcExp(vo);
	}
	
	// 파일 조회
	@ResponseBody
	@RequestMapping("/selectFileInfo")
	public AlcVo selectFileInfo(AlcVo vo){
		return service.selectFileInfo(vo);
	}
	
	// 파일 저장
	@ResponseBody
	@RequestMapping("/insertFileInfo")
	public void insertFileInfo(AlcVo vo, MultipartFile file){
		String originalName = file.getOriginalFilename();
		String fileName = originalName.substring(originalName.lastIndexOf("//")+1);
		String uuid = UUID.randomUUID().toString();
		String saveName = uuid + "_" + fileName;
		
		Path savePath = Paths.get(uploadPath + saveName);
		vo.setFileNm(saveName);
		
		try {
			file.transferTo(savePath);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		service.insertFileInfo(vo);
	}
	
	// 파일 삭제
	@ResponseBody
	@RequestMapping("/deleteFileInfo")
	public void deleteFileInfo(AlcVo vo){
		service.deleteFileInfo(vo);
	}
}
