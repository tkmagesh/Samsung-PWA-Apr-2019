function doWork(){
	for(var i=0;i<10000; i++){
		var percentCompleted = (i / 10000) * 100;
		self.postMessage({ type : 'progress', percentCompleted : percentCompleted});
		for(var j=0; j<10000; j++)
			for(var k=0; k < 100; k++){

			}
	}
	self.postMessage({ type : 'complete'});

}

self.addEventListener('message', onMessageFromMain);

function onMessageFromMain(evt){
	if (evt.data === 'startWork'){
		doWork();
	}
}