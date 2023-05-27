package com.sul.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.sul.server.vo.AlcVo;
import com.sul.server.vo.CategoryVo;

@Repository
@Mapper
public interface AlcMapper {
	public List<AlcVo> selectTotalAlcList(AlcVo vo);
	
	public AlcVo selectAlcDetail(AlcVo vo);
	
	public List<CategoryVo> selectCateList();
	
	public void insertAlcInfo(AlcVo vo);
	
	public void updateAlcInfo(AlcVo vo);
	
	public void deleteAlcInfo(AlcVo vo);
	
	public void updateAlcExp(AlcVo vo);
}
