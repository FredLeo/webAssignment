/*
 * Constructor function for a WeatherWidget instance.
 * 
 * container_element : a DOM element inside which the widget will place its UI
 *
 */
 
function WeatherWidget(container_element){

	//declare the data properties of the object 
	var _list = [];   //an array of currently downloaded weather listings as weather monitor objects
	var _request ;    //the XHR request object
	var _update;	  //update the list uing XHR
	var _currentSortOrder = 1;    //keep track of how the data is sorted, default is 1 = sort by town
	
	//declare an inner object literal to represent the widget's UI
	var _ui = {     //an inner object literal representing the widget's UI
	
		townEntry 	: 	null,	//a select tag to hold town names
		townRadio	: 	null,	//a radio button to sort by town name
		tempRadio	: 	null,	//a radio button to sort by max temperature
		sortByTown  :   null,   //a sort by town label
		sortByTemp	:   null,   //a sort by temperature label		
		townFind    :   null,   //button to find town name
		container	:	null,	// the container for all of the UI elements
		titlebar	:	null,	//div to organise UI elements
		toolbar		: 	null,   //div to organise UI elements
		list		: 	null,	//the div area which will hold the WeatherLine object UIs
		labeltag	: 	null
	};

	//write a function to create and configure the DOM elements for the UI
	var _createUI = function(container){
		
	//create the container for all of the UI elements and set up the titlebar
		_ui.container = container_element;
		_ui.container.className = "monitor";
		_ui.titlebar = document.createElement("div");
		_ui.titlebar.className = "title";
		_ui.titlebar.label = document.createElement("span");
		_ui.titlebar.label.innerHTML = "[Draggable] <b>Weather Monitor</b>";
		_ui.titlebar.appendChild(_ui.titlebar.label);
		
		//now create and set up the toolbar elements
		_ui.toolbar = document.createElement("div");
		
		//radio button option of town
		_ui.townRadio=document.createElement("input");
		_ui.townRadio.setAttribute("type","radio");
		_ui.townRadio.setAttribute("name",container_element.id);
		_ui.townRadio.setAttribute("value","town");
		_ui.townRadio.setAttribute('checked', 'checked');
		_ui.townRadio.onclick = function(){_doSort(1);	
			};	
		
		_ui.tempRadio=document.createElement("input");
		_ui.tempRadio.setAttribute("type","radio");
		_ui.tempRadio.setAttribute("name",container_element.id);
		_ui.tempRadio.setAttribute("value","temp");
		_ui.tempRadio.onclick = function(){_doSort(0);	
			};	
				
		//Auckland,	Christchurch,	Dunedin,	Hamilton,	Tauranga,	Wellington
		var auk=document.createTextNode("Auckland");
		var chr=document.createTextNode("Christchurch");
		var dun=document.createTextNode("Dunedin");
		var ham=document.createTextNode("Hamilton");
		var tau=document.createTextNode("Tauranga");
		var wel=document.createTextNode("Wellington"); 
				
		var aukOpt=document.createElement("option");
		var chrOpt=document.createElement("option");
		var dunOpt=document.createElement("option");
		var hamOpt=document.createElement("option");
		var tauOpt=document.createElement("option");
		var welOpt=document.createElement("option");
		
		//_ui.townEntry.aukOpt.appendChild(auk);
		aukOpt.appendChild(auk);
		aukOpt.onclick = function(){
			_addNewName(_ui.townEntry.value);			
		}
		chrOpt.appendChild(chr);
		chrOpt.onclick = function(){
			_addNewName(_ui.townEntry.value);			
		}
		dunOpt.appendChild(dun);
		dunOpt.onclick = function(){
			_addNewName(_ui.	
townEntry.value);			
		}
		hamOpt.appendChild(ham);
		hamOpt.onclick = function(){
			_addNewName(_ui.townEntry.value);			
		}
		tauOpt.appendChild(tau);
		tauOpt.onclick = function(){
			_addNewName(_ui.townEntry.value);			
		}
		welOpt.appendChild(wel);
		welOpt.onclick = function(){
			_addNewName(_ui.townEntry.value);			
		}
								
		_ui.townEntry=document.createElement("select");
		_ui.townEntry.appendChild(aukOpt);
		_ui.townEntry.appendChild(chrOpt);
		_ui.townEntry.appendChild(dunOpt);
		_ui.townEntry.appendChild(hamOpt);
		_ui.townEntry.appendChild(tauOpt);
		_ui.townEntry.appendChild(welOpt);
		
		_ui.townFind = document.createElement("button");
		_ui.townFind.innerHTML= "Update";
		_ui.townFind.onclick = function(){
			_updateWeatherList();
			//_ui.nameEntry.value = "";
		}
	
		_ui.sortByTown = document.createElement("label");
		_ui.sortByTown.innerHTML = "Town";
		_ui.sortByTown.onclick = function(){
			//_ui.townRadio.setAttribute("checked", "checked");
			_ui.townRadio.checked=true;
			_doSort(1);			
			}
			
		_ui.sortByTemp = document.createElement("label");
		_ui.sortByTemp.innerHTML = "Max Temp";
		_ui.sortByTemp.onclick = function(){
			//_ui.tempRadio.setAttribute("checked", "checked");
			_ui.tempRadio.checked=true;
			 _doSort(0);
			}
		_ui.labeltag=document.createElement("label");
		_ui.labeltag.innerHTML=" Sort by: ";	
			
		_ui.toolbar.appendChild(_ui.townEntry);
		_ui.toolbar.appendChild(_ui.townFind);
		_ui.toolbar.appendChild(_ui.labeltag);
		_ui.toolbar.appendChild(_ui.townRadio);
		_ui.toolbar.appendChild(_ui.sortByTown);
		_ui.toolbar.appendChild(_ui.tempRadio);
		_ui.toolbar.appendChild(_ui.sortByTemp);
			
		
		//finally create the div which will hold the weather monitor items
		_ui.list = document.createElement("div");
		
		//add the three components to the _ui container
		_ui.container.appendChild(_ui.titlebar);
		_ui.container.appendChild(_ui.toolbar);
		_ui.container.appendChild(_ui.list);

		//end of UI creation function
	}
	
	
	//add any other methods required for the functionality
	//private methods for the rest of the functionality are below 

	 /**
	  *  function to add a new name to the list
	  * first checks if name is already displayed
	  * if not then makes the AJAX request to get the details for this name
	  */  
	var _addNewName = function(name){	
		//first check if this person is already in the list
		for(i = 0; i < _list.length; i++){
			if(name == _list[i].getTown()){
				alert("Already in list");
				return;
			}
		}

		_request = new XMLHttpRequest();
		var url = "php/weather.php?town=" + name;
		_request.open("GET", url, true);
		_request.onreadystatechange = _addNewWeatherListItem;
		_request.send(null);
	}
	
	/**
	 *  AJAX Callback function 
	 *  Checks if data was returned
	 *  if yes then create a new weather list item with the data and add to _list array
	 *  calls _refreshWeatherList to update the UI display with the new data
	 */
	 	var _addNewWeatherListItem = function(){
		
			if (_request.readyState == 4) {
				if (_request.status == 200) {
					var data = JSON.parse(_request.responseText);
					if(data.length == 0){
						alert("No such town");
						return;
					}
					var n = data[0].town;
					var p = data[0].outlook.charAt(0).toUpperCase()+data[0].outlook.slice(1);
					var i = data[0].min_temp;
					var m = data[0].max_temp;
				
					var pitem = new WLine(n,p,i,m);
					_list.push(pitem);
					_refreshWeatherList();
				}
			}
		}
		
			  
	 /**
	 * private method to refresh the weatherlist display
	 * first removes all displayed items
	 * then makes sure sort order for _list is correct
	 * then adds each item in _list to the _ui display
	 */
	 var _refreshWeatherList = function() {
	 	//first remove all child nodes of the ui.list div
	 	if(_ui.list == null)
	 		return;
	 	while(_ui.list.hasChildNodes()){
	 		_ui.list.removeChild(_ui.list.lastChild);
	 	}
	 	//make sure the data is correctly sorted

		if(_currentSortOrder == 1){
	 		_list.sort(_namesort);
	 	} else {
	 		_list.sort(_idsort);
	 	}
	 	
	 	//add all items back to the UI
	 	for(var i = 0; i < _list.length; i++){
	 		var pline = _list[i];
	 		_ui.list.appendChild(pline.getDomElement());
	 	}
	 }

	//upate the weatherlist to make the list up to date
	function _updateWeatherList(){

		var xlist="";
		for(i = 0; i < _list.length; i++){			
			xlist+="'"+_list[i].getTown()+"',";			
		}
		
		_update = new XMLHttpRequest();
		var url = "php/updateWeather.php?town=" + xlist;
		_update.open("GET", url, true);

		_update.onreadystatechange = function(){
						
			if (_update.readyState == 4) {
				if (_update.status == 200) {	
					var data = JSON.parse(_update.responseText);						
					_list=[];
				
					for (var key in data) {
					    // skip loop if the property is from prototype
					    if (!data.hasOwnProperty(key)) continue;
					
					    var obj = data[key];					    
				        var n = obj['town'];
						var p = obj['outlook'].charAt(0).toUpperCase()+obj['outlook'].slice(1);
						var i = obj['min_temp'];
						var m = obj['max_temp'];				
						var pitem = new WLine(n,p,i,m);
						_list.push(pitem);				
						_refreshWeatherList();
					}									
				}
			}
		}
		_update.send(null);
	}
	
	/**
	 *  private method to sort the data - sets the _currentSortParameter and then
	 *  calss _refreshweatherList where the sorting occurs and display is updated
	 */
	  
	 var _doSort = function(sortBy){
	 	if(sortBy == 1){
	 	_currentSortOrder = 1;	 	
	 	}
	 	else{
	 		_currentSortOrder = 0;
	 	}
		 	_refreshWeatherList();
	 }
	 
	 /**
	  *  Comparator functions for sorting weatherlist items
	  */	  
	 var _idsort = function(a,b){
		return b.getMax() - a.getMax();
	}
	
	var _namesort = function(a, b){
		if(a.getTown() > b.getTown())
			return 1;
		else if (a.getTown() < b.getTown())
			return -1;
		else
			return 0;
		}

	 
	 /**
	  * private method to intialise the widget's UI on start up
	  * this method is complete
	  */
	  var _initialise = function(container_element){
	  	_createUI();
	  	}
	  	
	/*********************************************************
	* Constructor Function for the inner WLine object to hold the 
	* full weather data for a town
	********************************************************/
	
	var WLine = function(wtown, woutlook, wmin, wmax){
		
		//declare the data properties for the object
		var _town = wtown;
		var _outlook= woutlook;
		var _min = wmin;
		var _max = wmax;
		
		//declare an inner object literal to represent the widget's UI
		var _ui = {					//an object literal representing the UI for the name info			
			dom_element  	: null,   //the dom element for each line of data
			town_label   	: null,   //label for the visible data - town
			outlook_label  	: null,   //label for the visible data - outlook
			max_label  		: null,   //label for the visible data - max temperature
			min_label  		: null,   //label for the visible data - min temperature
		};

		//write a function to create and configure the DOM elements for the UI
		var _createUI = function(container){
		
		}
		
		//Add any remaining functions you need for the object
	/* function to create the DOM elements needed for the WeatherLine UI
		*/
		var _createUI = function(){
				
			_ui.dom_element = document.createElement('div');
			_ui.dom_element.className = "section";
			
			_ui.town_label = document.createElement('span');
			_ui.town_label.innerHTML = _town + " ";
			_ui.town_label.className = "section_label";
			
			_ui.outlook_label = document.createElement('span');
			_ui.outlook_label.innerHTML = _outlook + " ";
			_ui.outlook_label.classname = "numeric";
			
			_ui.min_label = document.createElement('span');
			_ui.min_label.innerHTML = _min + " ";
			_ui.min_label.classname = "numeric";
			
			_ui.max_label= document.createElement('span');
			_ui.max_label.innerHTML = _max + " ";
			_ui.max_label.classname = "numeric";
		
			_ui.dom_element.appendChild(_ui.town_label);
			_ui.dom_element.appendChild(_ui.outlook_label);			
			_ui.dom_element.appendChild(_ui.min_label);	
			_ui.dom_element.appendChild(_ui.max_label);
		};
		

		//getter methods for all of the private data
	
		//public method to return the Dom element so the weatherWidget can add it to its own UI
		this.getDomElement = function(){
			return _ui.dom_element;
		}
	
		this.getTown = function(){
			return _town;
		}	
			
		this.getOutLook = function(){
			return _outlook;
		}
			
		this.getMax = function(){
			return _max;
		}	
		
		this.getMin = function(){
			return _min;
		}	
		
		//_createUI() method is called when the object is instantiated
		_createUI();
	 
  	};  //this is the end of the constructor function for the WLine object 
	
	
	//  _initialise method is called when a WeatherWidget object is instantiated
	 _initialise(container_element);
}
	 
//end of constructor function for WeatherWidget 	 
	 
	 