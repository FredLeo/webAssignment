<?php
ini_set("error_reporting",E_ALL);
ini_set("log_errors","1");
ini_set("error_log","php_errors.txt");
if(!empty($_POST['name']) && !empty($_POST['pass']))	//make sure there are inputs from login part
{		
	$conn=mysqli_connect("mysql.cms.waikato.ac.nz","ll245","asdfgzxcvb","ll245");	//connect to database
	//avoid sql injection
	$password = mysqli_real_escape_string($conn,$_POST['pass']);
	$username = mysqli_real_escape_string($conn,$_POST['name']);

	$query="select * from `Users` where `username`='$username' and `password`='$password'; ";	//retrive data from database
	$result=mysqli_query($conn,$query);	
	$row=mysqli_fetch_assoc($result);
	if($row)	//if user account and password match
	{
		echo "<label id='lbName'>".ucwords($row['username'])."'s Stocks:</label><br/><br/>";	
		echo "<input id='btnAdd' onclick='btnAdd()' type='button' value='Add' />";
		$query="select * from `Stocks` ;";	//show all companies
		$result=mysqli_query($conn,$query);
		echo "<table><tr><th class='txtLeft'>Company</th><th id='thT'>Recent Movement</th></tr>";
		while($row=mysqli_fetch_assoc($result))
		{			
			if($row['recentchangedirection']=="Up")
		{
			echo "<tr onclick='popUp(&quot;".$row['companyname']."&quot;)'><td>".$row['companyname']."</td><td class='RM'>+".$row['recentchange']."</td></tr>";
		}
		else 
		{
		echo "<tr onclick='popUp(&quot;".$row['companyname']."&quot;)'><td>".$row['companyname']."</td><td class='RMM'>-".$row['recentchange']."</td></tr>";
		}
			
		}
		echo "</table>";		
	}
	else //password is not correct 
	{
		echo "wrong password";
	}
}
else
	{
		echo "Please input your Username and Password!";
	}
	mysqli_close($conn);
?>