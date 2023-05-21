package com.sul.server.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.sul.server.vo.AlcVo;
import com.sul.server.vo.ReviewVo;

@Repository
@Mapper
public interface ReviewMapper {
	
	public List<ReviewVo> selectAlcReviewList(ReviewVo vo);
	
	public ReviewVo selectAlcReviewDetail(ReviewVo vo);
	
	public int selectCheckPwd(ReviewVo vo);
	
	public int selectAlcNo(int reviewNo);
	
	public void insertAlcReview(ReviewVo vo);
	
	public void updateAlcReview(ReviewVo vo);
	
	public void mergeAlcReviewGrade(ReviewVo vo);
	
	public void deleteAlcReview(ReviewVo vo);
}
