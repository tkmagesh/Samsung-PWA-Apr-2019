(function(){

	function addSync(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`	[@Service] returning result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Client] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	window['addSyncClient'] = addSyncClient;

	function addAsync(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`	[@Service] returning result`);
			callback(result);
		}, 5000);
	}

	function addAsyncClient(x,y){
		console.log(`[@Client] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@Client] result = ${result}`);
		});
	}

	window['addAsyncClient'] = addAsyncClient;


	var addAsyncEvents = (function(){
		
		var callbacks = [];

		function process(x,y){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning result`);
				callbacks.forEach(function(callback){
					callback(result);
				});
			}, 5000);
		}

		function subscribe(callback){
			callbacks.push(callback);
		}

		return { 
			process : process,
			subscribe : subscribe
		};

	})();

	window['addAsyncEvents'] = addAsyncEvents;

	function addAsyncPromise(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var p = new Promise(function(resolveFn, rejectFn){
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning result`);
				resolveFn(result);
			}, 5000);
		});
		return p;
	}

	//window['addAsyncPromise'] = addAsyncPromise;

	async function addAsyncPromiseClient(x,y){
		/*
		console.log(`[@Client] triggering addSync`);
		var result = addAsyncPromise(x,y);
		console.log(`[@Client] result = ${result}`);
		*/

		/*console.log(`[@Client] triggering addSync`);
		var p = addAsyncPromise(x,y);
		p.then(function(result){
			console.log(`[@Client] result = ${result}`);	
		});*/

		console.log(`[@Client] triggering addSync`);
		var result = await addAsyncPromise(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	window['addAsyncPromiseClient'] = addAsyncPromiseClient;

})();

/*
Promise Client

var p = addAsyncPromise(10,20);
//then, catch
p.then(function(result){
	console.log(`[@Client] result = ${result}`);
})


//followup is async
var p = addAsyncPromise(10,20);
var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var p2 = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
            var doubleResult = result * 2;
            resolveFn(doubleResult);
        }, 5000);
	});
	return p2;
})

//followup is sync - 1
var p = addAsyncPromise(10,20);
var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var p2 = new Promise(function(resolveFn, rejectFn){
        var doubleResult = result * 2;
        resolveFn(doubleResult);
    });
	return p2;
})

//followup is sync - 2
var p = addAsyncPromise(10,20);
var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var doubleResult = result * 2;
	var p2 = Promise.resolve(doubleResult);
	return p2;
});

//followup is sync - 3
var p = addAsyncPromise(10,20);
var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var doubleResult = result * 2;
	return doubleResult;
});

*/