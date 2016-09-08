<?php
ini_set("error_reporting",E_ALL);
ini_set("log_errors","1");
ini_set("error_log","php_errors.txt");
	
	$list=$_POST['data'];	//get compan list that we need to add

	$conn=mysqli_connect("mysql.cms.waikato.ac.nz","ll245","asdfgzxcvb","ll245");
	$elements = explode("*", $list); //split list 
	for ($i = 0; $i < count($elements)-1; $i++)		
	{
		$query="select companyname,id,currentprice,recentchange,annualtrend,recentchangedirection from `StocksC` where `companyname`='".$elements[$i]."'";
		$reslt=mysqli_query($conn,$query);
		while($row=mysqli_fetch_assoc($reslt))
		{	//insert company
			$query="insert into `Stocks`(`companyname`,`id`,`currentprice`,`recentchange`,`annualtrend`,`recentchangedirection`) values('".$row['companyname']."',".$row['id'].",".$row['currentprice'].",".$row['recentchange'].",'".$row['annualtrend']."','".$row['recentchangedirection']."');";		
		}
		$result=mysqli_query($conn,$query);		
	}
	mysqli_close($conn);
?>