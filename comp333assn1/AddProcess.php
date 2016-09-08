<?php
ini_set("error_reporting",E_ALL);
ini_set("log_errors","1");
ini_set("error_log","php_errors.txt");
	$conn=mysqli_connect("mysql.cms.waikato.ac.nz","ll245","asdfgzxcvb","ll245");	//connect to databse
	$query="select * from `StocksC`;";	//retrive all data
	$result=mysqli_query($conn,$query);		
	
	$result=mysqli_query($conn,$query);	
	echo "<div class='lbtitle'>Select Stocks to add:</div>";
	echo "<ul>";
	while($row=mysqli_fetch_assoc($result))	//show all information
	{		
		echo "<li><input type='checkbox' name='companyname' value='".$row['companyname']."'>".$row['companyname']."</li>";		
	}
	echo "</ul>";
	echo "<input type='button' onclick='addList()' value='Add'>";
	mysqli_close($conn);	//close
?>