<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div>
		<form action="/selectAlcList" method="post" enctype="multipart/form-data">
			술 이름 : <input type="text" name="alcNm" id="alcNm">
			단종여부 : <input type="radio" name="expYn" value="true"> 단종 <input type="radio" name="expYn" value="false"> 단종 아님
			카테고리번호 : <input type="text" name="cateNo" id="cateNo">
			<input type="submit" value="test">
		</form>
		<form action="/selectAlcDetail" method="post" enctype="multipart/form-data">
			술 넘버 : <input type="text" name="alcNo" id="alcNo">
			<input type="submit" value="test">
		</form>
		<form action="/selectReviewList" method="post" enctype="multipart/form-data">
			리뷰용 술 넘버 : <input type="text" name="alcNo" id="alcNo">
			<input type="submit" value="test">
		</form>
		<form action="/selectReviewDetail" method="post" enctype="multipart/form-data">
			리뷰하나만 술 넘버 : <input type="text" name="alcNo" id="alcNo">
			리뷰하나만 리뷰 넘버 : <input type="text" name="reviewNo" id="reviewNo">
			<input type="submit" value="test">
		</form>
		<form action="/insertAlcReview" method="post" enctype="multipart/form-data">
			리뷰 등록용 술 넘버 : <input type="text" name="alcNo" id="alcNo">
			타이틀 : <input type="text" name="title" id="title">
			별점 : <input type="text" name="grade" id="grade">
			내용 : <input type="text" name="content" id="content">
			비밀번호 : <input type="text" name="reviewPwd" id="reviewPwd">
			사용자이름 : <input type="text" name="userNm" id="userNm">
			<input type="submit" value="test">
		</form>
		<form action="/updateAlcReview" method="post" enctype="multipart/form-data">
			리뷰 수정용 타이틀 : <input type="text" name="title" id="title">
			별점 : <input type="text" name="grade" id="grade">
			내용 : <input type="text" name="content" id="content">
			비밀번호 : <input type="text" name="reviewPwd" id="reviewPwd">
			리뷰번호 : <input type="text" name="reviewNo" id="reviewNo">
			<input type="submit" value="test">
		</form>
		<form action="/deleteAlcReview" method="post" enctype="multipart/form-data">
			리뷰 삭제용 비밀번호 : <input type="text" name="reviewPwd" id="reviewPwd">
			리뷰번호 : <input type="text" name="reviewNo" id="reviewNo">
			<input type="submit" value="test">
		</form>
		<form action="/insertAlcInfo" method="post" enctype="multipart/form-data">
			이름:  <input type="text" name="alcNm" id="alcNm">
			카테고리:  <input type="text" name="cateNo" id="cateNo">
			vol:  <input type="text" name="vol" id="vol">
			productor:  <input type="text" name="productor" id="productor">
			detail:  <input type="text" name="detail" id="detail">
			fileNo:  <input type="text" name="fileNo" id="fileNo">
			expYn:  <input type="text" name="expYn" id="expYn">
			<input type="submit" value="test">
		</form>
		
		<form action="/insertFileInfo" method="post" enctype="multipart/form-data">
			파일등록용 술넘버 : <input type="text" name="alcNo" id="alcNo">
			<input name="file" type="file" multiple>
			<input type="submit" value="test">
		</form>
		
		<form action="/selectFileInfo" method="post" enctype="multipart/form-data">
			파일조회용 술넘버 : <input type="text" name="alcNo" id="alcNo">
			<input type="submit" value="test">
		</form>
		<img src="./file/dd1e6fee-196f-46bd-ae92-c6cbd0b50eb5_2022101809381399647_1.jpg" />
		<form action="/deleteFileInfo" method="post" enctype="multipart/form-data">
			파일삭제용 술넘버 : <input type="text" name="alcNo" id="alcNo">
			<input type="submit" value="test">
		</form>
	</div>
</body>
</html>