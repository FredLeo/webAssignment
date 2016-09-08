<?php
ini_set("error_reporting",E_ALL);
ini_set("log_errors","1");
ini_set("error_log","php_errors.txt");		
	$conn=mysqli_connect("mysql.cms.waikato.ac.nz","ll245","asdfgzxcvb","ll245");	//get connect to database
	$query="select * from `Stocks` ;";	//get all information
	$result=mysqli_query($conn,$query);
	echo "<table><tr><th class='txtLeft'>Company</th><th>Recent Movement</th></tr>"; 	//refresh data on client side
	while($row=mysqli_fetch_assoc($result))
	{		
		if($row['recentchangedirection']=="Up")
		{
			echo "<tr onclick='popUp(&quot;".$row['companyname']."&quot;)'><td>".$row['companyname']."</td><td class='RM'>+".$row['recentchange']."</td></tr>";
		}else {
		echo "<tr onclick='popUp(&quot;".$row['companyname']."&quot;)'><td>".$row['companyname']."</td><td class='RMM'>-".$row['recentchange']."</td></tr>";
		}
	}
	echo "</table>";
	mysqli_close($conn);	//close
?>