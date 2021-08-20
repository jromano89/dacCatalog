<?php
	$inputJSON = file_get_contents('php://input');
	$input = json_decode($inputJSON, TRUE); //convert JSON into array

	$search = $input['s'];
	
	//MYSQL database to locate the users of that environment
	$mysqli = new mysqli("localhost","template_admin","\$Eattle2021","template_catalog");

	// Check connection
	if ($mysqli -> connect_errno) {
		error_log("Failed to connect to MySQL: " . $mysqli -> connect_error, 0);
		header("HTTP/1.1 500 Error");
		exit();
	}

	//Insert
	$query = "insert into se_catalog_usage (search_text) values ('" . $search . "')";
	if ($mysqli->query($query) === TRUE) {
		header("HTTP/1.1 200 OK");
	} else {
		echo "Failed to insert: " . $mysqli -> error;
		error_log ("Failed to insert: " . $mysqli -> error, 0);
		header("HTTP/1.1 500 Error");
	}