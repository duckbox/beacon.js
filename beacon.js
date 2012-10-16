(function(){

	var D = this.document,

	// Store ref IDs
	_pack = [],

	// Local bind function
	_bind = function( type, callback ) {
		D.addEventListener( type, callback );
	},	

	// Local execute function
	_trigger = function( type ) {

		var event;

		// How will we create an event?
		if (D.createEvent) {
			event = D.createEvent('HTMLEvents');
			event.initEvent(type, true, true);
		} else {
			event = D.createEventObject();
			event.eventType = type;
		}

		// Dispatch / Fire depending on support
		if (D.createEvent) {
			D.dispatchEvent(event);
		} else {
			D.fireEvent('on' + event.eventType, event);
		}
	};

	this.Beacon = function() {

		// Store this contexts ID
		this.id = _pack.length;
		_pack.push(this.id);

		// Set context flag
		this.isComplete = false;

		// Save status listeners in here
		this.status = {};
		
		this.done = function( callback ) {

			if( this.isComplete ) {
				return;
			}
			_bind('beacondef'+this.id, callback);
		};

		this.complete = function(){
			this.isComplete = true;
			_trigger('beacondef'+this.id);
		};

		this.listen = function( status, callback ) {
			this.status[status] = callback;
		};

		this.status = function( status ) {
			return this.status[status]();
		};

	};

}).call(this);