<?php

	/**************************
	 * Add your code to connect to your database here
	 */	 
	$conn=mysqli_connect("mysql.cms.waikato.ac.nz","ll245","asdfgzxcvb","ll245");	//connect to database
	$town = $_GET['town'];
    /***************************
    * 
    * Add code here to query the DB for weather information for the given town
    * 
    * Construct a PHP array object containing the weather data 
    * and return as JSON
    * 
    */
   
  	$query = "Select * from weather where town='$town'";
	$result = mysqli_query($conn, $query);	
	$data = array();	
	while ($row = mysqli_fetch_assoc($result)) {
     $data[] = $row;
  }
	
  	echo json_encode($data);
    mysqli_close();	
?>

