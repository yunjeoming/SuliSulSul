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
	</div>
</body>
</html>