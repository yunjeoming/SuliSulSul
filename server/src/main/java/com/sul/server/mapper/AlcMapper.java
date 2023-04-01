package com.sul.server.mapper;

import java.util.Map;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.sul.server.vo.AlcVo;

@Repository
@Mapper
public interface AlcMapper {
	public List<AlcVo> selectTotalAlcList(AlcVo vo);
	
	public AlcVo selectAlcDetail(AlcVo vo);
}
