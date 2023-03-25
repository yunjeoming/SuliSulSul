package com.sul.server.mapper;

import java.util.Map;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface AlcMapper {
	public List<Map<String, Object>> selectTotalAlcList();
}
