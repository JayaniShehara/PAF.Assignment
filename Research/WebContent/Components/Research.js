$(document).ready(function()
{
	if ($("#alertSuccess").text().trim() == "")
	{
		$("#alertSuccess").hide();
	}
	$("#alertSuccess").hide();
	$("#alertError").hide();
});

//SAVE ============================================
$(document).on("click", "#btnSave", function(event)
{
	// Clear alerts---------------------
	 $("#alertSuccess").text("");
	 $("#alertSuccess").hide();
	 $("#alertError").text("");
	 $("#alertError").hide(); 
	 
	// Form validation-------------------
	 var status = validateResearchForm();
	 if (status != true)
		 {
		  $("#alertError").text(status);
		  $("#alertError").show();
		  return;
	 }
	 // If valid-------------------------
	 var type = ($("#hidResearchIDSave").val() == "") ? "POST" : "PUT";
	 $.ajax(
	 {
		 url : "ResearchAPI",
		 type : type,
		 data : $("#formResearch").serialize(),
		 dataType : "text",
		 complete : function(response, status)
		 {
			 onResearchSaveComplete(response.responseText, status);
		 }
	 }); 
});

function onResearchSaveComplete(response, status)
{
	if (status == "success")
	 {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divResearchGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			 $("#alertError").text(resultSet.data);
			 $("#alertError").show();
		}
	 } else if (status == "error")
	 {
			 $("#alertError").text("Error while saving.");
			 $("#alertError").show();
	 } else
	 {
			 $("#alertError").text("Unknown error while saving..");
			 $("#alertError").show();
	 } 
	
	 $("#hidResearchIDSave").val("");
	 $("#formResearch")[0].reset();
}

//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
{
	 $("#hidResearchIDSave").val($(this).data("researchid")); 
	 $("#name").val($(this).closest("tr").find('td:eq(0)').text());
	 $("#author").val($(this).closest("tr").find('td:eq(1)').text());
	 $("#desc").val($(this).closest("tr").find('td:eq(2)').text());
});

//CLIENT-MODEL================================================================
function validateResearchForm()
{
	// NAME
	if ($("#name").val().trim() == "")
	{
		return "Insert Name.";
	}
	// AUTHOR
	if ($("#author").val().trim() == "")
	{
		return "Insert Author.";
	}
	// DESCRIPTION-------------------------------
	if ($("#desc").val().trim() == "")
	{
		return "Insert Description.";
	}
	// is numerical value
	//var tmpPrice = $("#itemPrice").val().trim();
	//if (!$.isNumeric(tmpPrice))
	//{
		//return "Insert a numerical value for Item Price.";
	//}
	// convert to decimal price
	//$("#itemPrice").val(parseFloat(tmpPrice).toFixed(2));
	
	// DESCRIPTION------------------------
	//if ($("#desc").val().trim() == "")
	//{
	//	return "Insert Item Description.";
	//}
	return true;
}

$(document).on("click", ".btnRemove", function(event)
{
		 $.ajax(
		 {
			 url : "ResearchAPI",
			 type : "DELETE",
			 data : "id=" + $(this).data("researchid"),
			 dataType : "text",
			 complete : function(response, status)
			 {
				 onResearchDeleteComplete(response.responseText, status);
			 }
		 });
});


function onResearchDeleteComplete(response, status)
{
	if (status == "success")
	 {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success")
		{
			 $("#alertSuccess").text("Successfully deleted.");
			 $("#alertSuccess").show();
			 $("#divResearchGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error")
		{
			 $("#alertError").text(resultSet.data);
			 $("#alertError").show();
		}
	 } else if (status == "error")
	 {
			 $("#alertError").text("Error while deleting.");
			 $("#alertError").show();
	 } else
	 {
			 $("#alertError").text("Unknown error while deleting..");
			 $("#alertError").show();
	 }
}


