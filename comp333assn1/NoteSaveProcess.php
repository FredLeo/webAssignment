<?php
ini_set("error_reporting",E_ALL);
ini_set("log_errors","1");
ini_set("error_log","php_errors.txt");
	$notes=$_POST['note'];	//get note
	$company=$_POST['company'];	//get company name
	$conn=mysqli_connect("mysql.cms.waikato.ac.nz","ll245","asdfgzxcvb","ll245");	//get connect to database
	$query="update `Stocks` set `note`='$notes' where `companyname`='$company';";	//update query
	$result=mysqli_query($conn,$query);	
?>