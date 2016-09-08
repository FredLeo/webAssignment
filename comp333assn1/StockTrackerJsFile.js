// JavaScript source code
// Student ID: ll245
// Name: Li Lai
// Comp333 Assignment 1

var flagName = null;
var comp = null;

//get the date
function GetDate() {
    document.getElementById("lbTime").innerHTML = Date();
}

//refresh every second
setInterval(GetDate, 1000);

//pop up login part for users to login
function btnLogin() {
    document.getElementById("divLogin").innerHTML = "<div><label>Username:</label><input class='textInput' type='text' id='IpName' name='username' placeholder='Username-fred' /><br /><br /><label>Password:</label><input class='textInput' type='password' id='IpPass' placeholder='Password-fred' name='password' /><br /><br /><input id='ipblogin' type='button' onclick='checkLogin()' name='btnOk' value='LOGIN' /></div>";
    document.getElementById("btnLogin").style.display = "none";    		//hid login button
}

//check username and password
function checkLogin() {    
    var username = document.getElementById("IpName").value;
    var password = document.getElementById("IpPass").value;
    var data = "name=" + username + "&pass=" + password;
    ajax("StockProcess.php", aftercheck, data, true);
    document.getElementById("btnLogout").style.display = "inline";		//if successfully login replace login button by logout 
    flagName = username;		//keep username
}

//after check if user can log in
function aftercheck(s) {
    document.getElementById("divLogin").innerHTML = "";
    document.getElementById("divInfo").innerHTML = s;
}


//logout dispose every variable that keep user login information
function btnLogout() {
    document.getElementById("btnLogin").style.display = "inline";
    document.getElementById("btnLogout").style.display = "none";
    document.getElementById("divInfo").innerHTML = "";
    document.getElementById("divDetail").innerHTML = "";
    var flagName = null;
    var comp = null;
}

//when click on company name pop up corresponding window with details of that company 
function popUp(company) {   	
    var data="company=" + company;
    ajax("DetailProcess.php", function getDetail(s){
	document.getElementById("divDetail").innerHTML = s;	
	}, data, true);    
    comp = company;	//store company name
}

//click remove button remove company then refresh compnay list
function btnRemove() {
    remove();
    refresh();
}

//remove company
function remove() {  
   var data="&company=" + comp;
   ajax("RemoveProcess.php", null, data, false);  
}

//refresh the part holds company list
function refresh() {
    document.getElementById("divInfo").innerHTML = "<label id='lbName'>" + flagName.toUpperCase() + "'s Stocks:</label><br/><br/><input id='btnAdd' onclick='btnAdd()' type='button' value='Add' />";        
   	ajax("RefreshProcess.php", function getDetail(s){
	document.getElementById("divDetail").innerHTML = "";
    document.getElementById("divInfo").innerHTML += s;	
	}, null, true);  
}

function btnSave() {    
   	var data= "note=" + document.getElementById("txtNote").value + "&company=" + comp;
	ajax("NoteSaveProcess.php", function getDetail(s){
	document.getElementById("divLogin").innerHTML = s;
                popUp(comp);	
	}, data, true); 
    var x = document.getElementsByClassName("showing");		//show notes label ,notes information and button after user click edit
    x[0].style.visibility = "visible";
    var show = document.getElementsByClassName("hidd");		//hide items that users type note in 
    show[0].style.visibility = "hidden";
}

//hide detailed information
function infoHidden() {
    document.getElementById("disapear").style.display = "none";
}

//edit company notes
function btnEdit() {
    var x = document.getElementsByClassName("showing");
    x[0].style.visibility = "hidden"; //hide notes label ,notes information and button after user click edit 
    var show = document.getElementsByClassName("hidd");
    show[0].style.visibility = "visible"; //show items to let user input notes
    document.getElementById('txtNote').focus();
}

//show compan list that can be added
function btnAdd() {   
    ajax("AddProcess.php", function getDetail(s){
	document.getElementById("divDetail").innerHTML = s;	
	}, null, true);  
}

//add company list to database
function addList() {
    var sendMsg = "";
    var list = document.getElementsByName("companyname");
    //combine company lists
    for (i = 0; i < list.length; i++) {	
        if (list[i].checked)
            sendMsg += list[i].value + "*";	
    }
    sendMsg = "data=" + sendMsg;
    ajax("ListProcess.php", function listF(s) {
    document.getElementById("divLogin").innerHTML = s;
}, sendMsg, false);
    refresh();	//refresh renewed part in webpage
}

/*main function for ajax
first argument: url
second argument: reponse function for hold call back xml 
data: data waits for sending
state: whether need to use asynchronise
* */
function ajax(url, response, data, state) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, state);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                response(xhr.responseText);
            }
            else {
                alert("Error: " + xhr.statusText);
            }
        }
    }  
    xhr.send(data);
}

//show loggin interface when user wants to login
function fillInLogin(s) {
    document.getElementById("divDetail").innerHTML = "";
    document.getElementById("divLogin").innerHTML = s;
}

