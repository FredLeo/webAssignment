<?php
ini_set("error_reporting",E_ALL);
ini_set("log_errors","1");
ini_set("error_log","php_errors.txt");
	$company=$_POST['company']; 	//get company name
	$conn=mysqli_connect("mysql.cms.waikato.ac.nz","ll245","asdfgzxcvb","ll245");	//connect to database
	$query="delete from `Stocks` where `companyname`='$company';";	//delete the company that user wants to delete
	$result=mysqli_query($conn,$query);	
	mysqli_close($conn);		//close
?>