<?php
ini_set("error_reporting",E_ALL);
ini_set("log_errors","1");
ini_set("error_log","php_errors.txt");

$lat=$_GET["lat"];
$lon=$_GET["lon"];
$interest=$_GET["name"];

$api_key="AIzaSyCIzIHjnpBYh2SD3vzOP-KmFiV-MKoxcmM";//put your API key here
$BASE_URL="https://maps.googleapis.com/maps/api/place/nearbysearch/json?";

$google_query="location=$lat,$lon&radius=1000&type=$interest&";

$google_url=$BASE_URL.$google_query."&key=".$api_key;

$connection=curl_init($google_url);	//initialize connection
curl_setopt($connection,CURLOPT_HEADER,false);
curl_setopt($connection,CURLOPT_RETURNTRANSFER,true);
$response=curl_exec($connection);	//execute and get result
curl_close($connection);	//close

echo $response;	//return result back
?>
