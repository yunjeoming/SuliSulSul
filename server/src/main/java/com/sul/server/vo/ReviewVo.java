package com.sul.server.vo;

import lombok.Data;

@Data
public class ReviewVo {
	private int alcNo;
	private String alcNm;
	private int reviewNo;
	private String title;
	private double grade;
	private int fileNo;
	private String fileNm;
	private String fileExt;
	private String content;
	private String userType;
	private String modyDt;
	private String regDt;
	private String userNm;
	private String reviewPwd;
	private int pageNo;
	private int startPage;
	private int lastPage;
}
