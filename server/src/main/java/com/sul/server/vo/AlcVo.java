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
}
