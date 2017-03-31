$( document ).ready(function() {
    var url_ = "http://www.haungon.co.uk/rsvp";
    var resp = "";
    // console.log( "ready!" );

    $("#dialog-message").hide();





    $("#send").click(function() {

    	var first_name = $.trim(  $('#first_name').val() );
    	var last_name = $.trim(  $('#last_name').val() );
	var mobile =  $.trim(  $('#mobile').val() );
	var guest =  $.trim(  $('#guest').val() );
	var message =  $.trim(  $('#message').val() );

	//ensure fields are not not empty
	if ((message == "")||(mobile == "")||(guest== "")){
	    message="No message Added";
	    mobile="Mobile # not provided";
	    guest="1";
	    
	}; 
	


	var data_={
	    "first_name":first_name,
	    "last_name":last_name,
	    "mobile":mobile,
	    "guest":guest,
	    "message":message
	     };

	// var data_=[first_name, last_name]
    	var msg = "Data collected for " + first_name + " " + last_name;
	var json_data = JSON.stringify(data_,null, '\t');
  
    	console.log(msg);
    	console.log(data_);

	console.log(json_data);


	if ((first_name != "")||(last_name != "")){
	    console.log("Sending Data to server...");


	    	$.ajax({
	    	    type : "POST",
	    	    url : url_,
	    	    data:json_data,
	    	    contentType: 'application/json;charset=UTF-8',
	    	    // contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	    
	    	    success: function(result) {
	    	        //console.log(result);
	    		resp = result
	    	        json_result = JSON.parse(result);
	    	        console.log(json_result);
	    		$("#message").text(json_result);
			$("#dialog-message").show();
	    		// $(".popup").show();
			// location.reload();
	    	    },
	    	    async: false
	    	});


	    	return false;



	    
	}; 
	

    // 	$.ajax({
    // 	    type : "POST",
    // 	    url : url_,
    // 	    data:json_data,
    // 	    contentType: 'application/json;charset=UTF-8',
    // 	    // contentType:'application/x-www-form-urlencoded; charset=UTF-8',
	    
    // 	    success: function(result) {
    // 	        //console.log(result);
    // 		resp = result
    // 	        json_result = JSON.parse(result);
    // 	        console.log(json_result);
    // 		$("#alert").text(json_result);
    // 		$(".popup").show();
		
    // 	    },
    // 	    async: false
    // 	});


    // 	return false;

    }); 

    $("#alert").click(function(){

	$(".popup").hide();
	location.reload();
    });

    $("#dialog-message").click(function(){

	$("#dialog-message").hide();
	location.reload();
    });



});




    // var username = $('#username').val();
    // var password = $('#userpassword').val();
    // data_post.push({
    // 	username:username,
    // 	password:password
    // });
    // console.log(data_post);


    // $.ajax({
    // 	type : "POST",
    // 	url : "login",
    // 	data: JSON.stringify(data_post, null, '\t'),
    // 	contentType: 'application/json;charset=UTF-8',
    // 	headers: {
    //         'X-token':'',
    //         'Content-Type':'application/json'
    // 	    },
    // 	success: function(result) {
    // 	        //console.log(result);
	        
    // 	        json_result = JSON.parse(result);
    // 	        token_id = json_result['data'];
    // 	        user = json_result['reason'];
    // 	        console.log(json_result);
    // 	    },
    // 	async: false
    // });

    // if(token_id){
    // 	console.log("valid");
    // 	console.log(token_id);
    // 	localStorage.setItem("token", token_id);
    // 	localStorage.setItem("user", user);
    // 	window.location.href = url_1 + token_id;
    // }else{
    // 	console.log(user);
    // 	alert(user);
    // 	location.reload();
    // }
