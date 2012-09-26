(function(){

	var D = this.document,

	_pack = [],

	_bind = function( type, callback ) {
		D.addEventListener( type, callback );
	},	

	_trigger = function( type ) {

		var event;

		if (D.createEvent) {
			event = D.createEvent('HTMLEvents');
			event.initEvent(type, true, true);
		} else {
			event = D.createEventObject();
			event.eventType = type;
		}

		if (D.createEvent) {
			D.dispatchEvent(event);
		} else {
			D.fireEvent('on' + event.eventType, event);
		}
	},

	Beacon = function() {

		this.id = _pack.length;
		_pack.push(this.id);
		this.isComplete = false;
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