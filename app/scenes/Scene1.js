alert('SceneScene1.js loaded');

var Server = {
		dataReceivedCallback:null,
		xhttp:null,
		 videoNames: new Array(),
		 videoUrls: new Array(),
		};

var Constant = {
	UNDEFINITE_FOCUSED:0,
    LIST_FOCUSED:1,
    PLAYER_FOCUSED: 2
};

function SceneScene1() {
	//videoNames= [],
	//videoURLs= [];
	alert("!!!!!!! Constructor is called SceneScene1");
	
    curSelected = Constant.UNDEFINITE_FOCUSED;
    selectedItem = -1;
};

SceneScene1.prototype.fillChannelList = function() {
	
    alert("SceneScene1.fillChannelList");
    alert("video names size" + Server.videoNames.toString());
    alert("Urls:" + Server.videoUrls.toString());
	
    $('#svecListbox').sfList({
		data: Server.videoNames ,
		index:0
	});
    this.setFocus(Constant.LIST_FOCUSED);
	
};


SceneScene1.prototype.initialize = function () {
	alert("SceneScene1.initialize()");
	// this function will be called only once when the scene manager show this scene first time
	// initialize the scene controls and styles, and initialize your variables here
	// scene HTML and CSS will be loaded before this function is called
	sf.service.VideoPlayer.setKeyHandler(sf.key.ENTER, function () {
		alert("Enter in full screen mode");
		sf.service.VideoPlayer.setFullScreen(false);
	});

	/*
	Server.init();
	Server.dataReceivedCallback = function() {
		alert("callback is called");
		SceneScene1.prototype.fillChannelList();
	};
	*/

    alert("videoNames:" + Server.videoNames.toString());
	
	$('#svecListbox').sfList({
		data:Server.videoNames,
		index:0
	});
	$('#svecLabel').sfLabel({
		text:'XXX label'
	});
	sf.service.VideoPlayer.init({
		onend:function(){
			sf.service.VideoPlayer.setFullScreen(false);
		}
	});
	sf.service.VideoPlayer.setKeyHandler(sf.key.RETURN, 
	function(){
		sf.service.VideoPlayer.setFullScreen(false);
	});
	var vLeft = parseInt($("#svecVideo").css('left'));
	var vTop = parseInt($("#svecVideo").css('top'));
	var vHeight = parseInt($("#svecVideo").css('height'));
	var vWidth = parseInt($("#svecVideo").css('width'));
	sf.service.VideoPlayer.setPosition({
		left:vLeft,
		top:vTop,
		width:vWidth,
		height:vHeight
	});
	sf.service.VideoPlayer.show();
};

SceneScene1.prototype.setFocus = function(newFocus) {
	alert("SceneScene1.setFocus=" + newFocus);
	if( this.playerFullScreenMode == true ) 
		return;
	
	if( Constant.LIST_FOCUSED == newFocus ) {
		$('#svecListbox').sfList('focus');
		this.curSelected = Constant.LIST_FOCUSED;
		alert("SceneScene1.setFocus List is focused");
	} else if (Constant.PLAYER_FOCUSED == newFocus ) {
		sf.service.VideoPlayer.focus();
		this.curSelected = Constant.PLAYER_FOCUSED;
		alert("SceneScene1.setFocus Player is focused");
	}
};

SceneScene1.prototype.toglePlayerFullScreenMode = function() {
	alert( "toglePlayerFullScreenMode" );
	sf.service.VideoPlayer.setFullScreen(true);
	
	/*
	if ( this.playerFullScreenMode == true ) {
		alert( "set to false" );
		sf.service.VideoPlayer.setFullScreen(false);
		this.playerFullScreenMode = false;
	} else {
		alert( "set to true" );
		sf.service.VideoPlayer.setFullScreen(true);
		this.playerFullScreenMode = true;
	}
	//this.curSelected = this.PLAYER_FOCUSED
	*/
};

SceneScene1.prototype.playUrl = function( url, title ) {
    alert("SceneScene1.prototype.playUrl url=" + url + " title=" + title );
    sf.service.VideoPlayer.stop();
	sf.service.VideoPlayer.play({
        url : url,
        title : title
        });
    alert("Playing...");

};

SceneScene1.prototype.handleShow = function (data) {
	alert("SceneScene1.handleShow()");
	alert("Set focus");
	//this.setFocus(this.LIST_FOCUSED);
	//$('#svecListbox').sfList('focus');
	//sf.scene.focus('#svecListbox_o7i6');
	// this function will be called when the scene manager show this scene
	// this function will be called when the scene manager show this scene
};

SceneScene1.prototype.handleHide = function () {
	alert("SceneScene1.handleHide()");
	// this function will be called when the scene manager hide this scene
};

SceneScene1.prototype.handleFocus = function () {
	alert("SceneScene1.handleFocus()");
	// this function will be called when the scene manager focus this scene
};

SceneScene1.prototype.handleBlur = function () {
	alert("SceneScene1.handleBlur()");
	// this function will be called when the scene manager move focus to another scene from this scene
};

SceneScene1.prototype.handleKeyDown = function (keyCode) {
	alert("SceneScene1.handleKeyDown(" + keyCode + ")");
	// TODO : write an key event handler when this scene get focued
	switch (keyCode) {
		case sf.key.LEFT:
			//var scene = sf.scene.getFocused();
			//alert(scene);
			this.setFocus(Constant.LIST_FOCUSED);
			break;
		case sf.key.RIGHT:
			//var scene = sf.scene.getFocused();
			//alert(scene);
			this.setFocus(Constant.PLAYER_FOCUSED);
			break;
		case sf.key.UP:
			$('#svecListbox').sfList('prev');
			break;
		case sf.key.DOWN:
			$('#svecListbox').sfList('next');
			break;
		case sf.key.ENTER:
			
            alert("this.curSelected" + this.curSelected );
            
            
            
	   		    //var list = document.getElementById('#svecListbox_o7i6');
			var currentFocused = $('#svecListbox').sfList('getIndex');
			alert("currentFocused = " + currentFocused);
			    
			var selected_url =	Server.getUrlByIdx(currentFocused);
			alert("selected_url = " + selected_url );
			    
			var selItem = 	$('#svecListbox').sfList('getSelectedItem');
			alert("selItem  = " + selItem );
			var val = $('#svecListbox').val();
			alert("val  = " + val);
			alert("focused doc = " + document.activeElement.attributes.length);
			$('#svecLabel').html(selItem );
			alert("handle default key event, key code(" + keyCode + ")" );
			if ( this.selectedItem != currentFocused ) {
				this.selectedItem = currentFocused;
				this.playUrl( selected_url, selItem); 
			} else {
				alert( "set full screen mode" );
				sf.service.VideoPlayer.setFullScreen(true);	
			}
			
			break;
			
		default:
			break;
	};
};




alert( "Server = ", Server);

Server.init = function() {
	 alert("Server::init");
	 this.xhttp=new XMLHttpRequest();
	 
     this.xhttp.onreadystatechange = function() {
         alert("ReadyState :" + Server.xhttp.readyState );
    	 if (Server.xhttp.readyState == 4) {
    		 alert("Status :" +Server.xhttp.status);        	 
             Server.processChannelList();
         }
     };
	 
	  //xhttp.setRequestHeader("Access-Control-Allow-Origin","*");
	 //this.xhttp.open("GET","http://192.168.1.60:8080/channels",true);
	 this.xhttp.open("GET","http://213.174.19.145:8080/channels",true);
	 alert("##### opened ...");
	 this.xhttp.send(null);
	 //alert("response text:" + xhttp.responseText);
	 //alert("response xml:" + xhttp.responseXML);
	 /*
	 if(xhttp.status == 200) {
	      return processChannelList(xhttp.responseText);
	  } else {
	      return false;
	  }
	  */

};

Server.processChannelList = function() {
	alert("Server.processChannelList");
	var xmlChannelList = this.xhttp.responseText;
	alert("response Text: ", this.xhttp.responseText);
	xmlDoc=loadXMLString(xmlChannelList);
   
	var items = xmlDoc.getElementsByTagName("item");
	var videoURLs = [];
   for (var index = 0; index < items.length; index++) {
       titleElement = items[index].getElementsByTagName("title")[0];
       linkElement = items[index].getElementsByTagName("link")[0];

       if (titleElement && linkElement) {
    	   if (!this.videoNames[index]) {
    		   this.videoNames[index] = [];
    	   }
           this.videoNames[index] = titleElement.firstChild.data;
           if(!videoURLs[index]) {
        	    videoURLs[index]= {};
           }
           videoURLs[index] = linkElement.firstChild.data;
           alert("Index = " + index + " title = " + titleElement.firstChild.data + " link= " + linkElement.firstChild.data);
       };

   }
   this.videoUrls = videoURLs;
   alert("videoUrls:" + typeof(Server.videoUrls));
   
   this.dataReceivedCallback();
   
	return true;
};

Server.getUrlByIdx = function(idx) {
	return this.videoUrls[idx];
};
 
function loadXMLString(txt)
{
if (window.DOMParser)
 {
 parser=new DOMParser();
 xmlDoc=parser.parseFromString(txt,"text/xml");
 }
else // code for IE
 {
 xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
 xmlDoc.async=false;
 xmlDoc.loadXML(txt);
 }
return xmlDoc;
};
