

function onStart () {
	// TODO : Add your Initilize code here
	// NOTE : In order to start your app, call "sf.start()" at the end of this function!!

	Server.init();
	Server.dataReceivedCallback = function() {
		alert("delayed start !!!!");
		
	    alert("video names size" + Server.videoNames.toString());
	    alert("Urls:" + Server.videoUrls.toString());
		
		sf.scene.show('Scene1');
		sf.scene.focus('Scene1');
		//SceneScene1.prototype.fillChannelList();
	};
	
	//sf.scene.show('Scene1');
	//sf.scene.focus('Scene1');
}
function onDestroy () {
	//stop your XHR or Ajax operation and put codes to distroy your application here
	
}

alert("init.js loaded.");
