package com.sul.server.vo;

import lombok.Data;

@Data
public class AlcVo {
	private int alcNo;
	private String alcNm;
	private int cateNo;
	private String cateNm;
	private int fileNo;
	private String filePath;
	private String fileNm;
	private String fileExt;
	private double avgGrade;
	private double vol;
	private String productor;
	private String detail;
	private String expYn;
	private int reviewCnt;
	private int pageNo;
	private int startPage;
	private int lastPage;
	private int totPage;
	/* 리뷰 등급별 개수 */
	private int grade5;
	private int grade45;
	private int grade4;
	private int grade35;
	private int grade3;
	private int grade25;
	private int grade2;
	private int grade15;
	private int grade1;
}
