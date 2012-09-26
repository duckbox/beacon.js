##Beacon.js

Beacon is a minimal status service for processes, for example,

We make a new Beacon,

	```javascript
	var _process = new Beacon();
	```
	
We set up a function to execute when it is complete,

	_process.done(function(){
		console.log('We are all done');
	});
	
We can also listen for custom status updates,

	_process.listen('stage-3', function(){
		console.log('We are at 3');
	});

	_process.listen('stage-7', function(){
		console.log('We are at 7');
	});
	
A non real word example, but simple enough to explain wtf is going on,

	for( i=0; i <=10; i++ ) {
		
		if( i == 3 ) {
			_process.status('stage-3');
		}
		
		if( i == 7 ) {
			_process.status('stage-7');
		}
		
	}
	
	_process.complete();
	
When the status of __stage-3__ is called, it would execute the listener and log __"We are at 3"__, the same same for __stage-7__ and any other custom status.

When __complete()__ is executed, our __done()__ function executes.

Beacon.js is under 1kb and requires nothing but your browser.