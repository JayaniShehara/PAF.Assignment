<%@page import="com.Research"%>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Research Management</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.4.0.min.js"></script>
<script src="Components/Research.js"></script>
</head>
<body>

	<div class="container">
		<div class="row">
			<div class="col-6">
				<h1>Research Management V10.1</h1>
				<form id="formResearch" name="formResearch">
					Research name: 
					<input id="name" name="name" type="text"
						class="form-control form-control-sm"> 
					
					<br> Research author: 
					<input id="author" name="author" type="text"
						class="form-control form-control-sm"> 
						
					<br>Research description: 
					<input id="desc" name="desc" type="text"
						class="form-control form-control-sm"> 
						
					<br> 
					<input id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> 
					<input type="hidden" id="hidResearchIDSave" 
						name="hidResearchIDSave" value="">
				</form>
				
				<br/>
				<div id="alertSuccess" class="alert alert-success"></div>
				<div id="alertError" class="alert alert-danger"></div>

				<br>
				<div id="divResearchGrid">
					<%
						Research researchObj = new Research();
						out.print(researchObj.readResearch());
					%>
				</div>

			</div>
		</div>
	</div>
</body>
</html>

