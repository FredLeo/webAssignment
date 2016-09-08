<?php
ini_set("error_reporting",E_ALL);
ini_set("log_errors","1");
ini_set("error_log","php_errors.txt");
	$company=$_POST['company'];	//get company name from client
	$conn=mysqli_connect("mysql.cms.waikato.ac.nz","ll245","asdfgzxcvb","ll245");	//connect to database
	$query="select * from `Stocks` where `companyname`='$company';";	//select the company that client request
	$result=mysqli_query($conn,$query);		
	$row=mysqli_fetch_assoc($result);
	//get company details
	echo "<b>$row[companyname]</b><input id='btnRemove' type='button' onclick='btnRemove()' value='Remove' /><br/>";	
	echo "<div><label class='fleft'>Current price:</label><div class='DivCurr'>$row[currentprice]</div></div><br/>";
	if($row['recentchangedirection']=="Up")
	{
		echo "<div><label class='fleft'>Recent movement:</label><div class='RMl'>+$row[recentchange]</div></div>";
	}else {
		echo "<div><label class='fleft'>Recent movement:</label><div class='RMMl'>-$row[recentchange]</div></div>";
	}		
		echo "<br/><div><label class='fleft'>Annual trend:</label><div class='DivAnul'>$row[annualtrend]</div></div>";
		echo "<div class='hold'></div>";
		echo "<div class='showing' >Notes: <label id='lbNote' >$row[note]</label><input id='btnEdit' type='button' onclick='btnEdit()' value='Edit' /></div>";
	echo "<div class='hidd'>Notes: <textarea id='txtNote' placeholder='input your notes here' rows='2' cols='50'>$row[note]</textarea><input id='btnSave' type='button' onclick='btnSave()' value='Save' /></td></div>";
	mysqli_close($conn);
?>