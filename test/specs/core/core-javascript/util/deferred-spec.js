describe('Module deferred', function(){
	var Deferred,
		exceptionRaised;

	require(['util/deferred'], function(deferred){
		Deferred = deferred;
	});

	beforeEach(function(){
		exceptionRaised = false;

		waitsFor(function(){
			return Deferred;
		});
	});

	it('The error in the then should get catched', function(){
		var _deferred = new Deferred();

		registerThen(_deferred);

		registerException();

		_deferred.resolve();

		runs(function(){
			expect(exceptionRaised.message).toBe("Some error");
		});
	});

	it('The error in the done should get catched', function(){
		var _deferred = new Deferred();

		registerDone(_deferred);

		registerException();

		_deferred.resolve();

		runs(function(){
			expect(exceptionRaised.message).toBe("Some error");
		});
	});

	it('The error in the fail should get catched', function(){
		var _deferred = new Deferred();

		registerFail(_deferred);

		registerException();

		_deferred.reject();

		runs(function(){
			expect(exceptionRaised.message).toBe("Some error");
		});
	});

	it('The error in the always should get catched', function(){
		var _deferred = new Deferred();

		registerAlways(_deferred);

		registerException();

		_deferred.resolve();

		runs(function(){
			expect(exceptionRaised.message).toBe("Some error");
		});
	});

	describe('subscription', function(){

		it('should resolve a deferred when the registered deferred is resolved too', function(){
			var _subscriber = new Deferred(),
				_publisher = new Deferred();

			_subscriber.subscribe(_publisher);

			_subscriber.then(function(){
				throw new Error("Some error");
			});

			registerException();

			_publisher.resolve();

			runs(function(){
				expect(exceptionRaised.message).toBe("Some error");
			});

		});

		it('should reject a deferred when the registered deferred is rejected too', function(){
			var _subscriber = new Deferred(),
				_publisher = new Deferred();

			_subscriber.subscribe(_publisher);

			_subscriber.fail(function(){
				throw new Error("Some error");
			});

			registerException();

			_publisher.reject();

			runs(function(){
				expect(exceptionRaised.message).toBe("Some error");
			});

		});

	})

	function registerThen(deferred){
		deferred.then(function(){
			throw new Error("Some error");
		});
	}

	function registerDone(deferred){
		deferred.done(function(){
			throw new Error("Some error");
		});
	}

	function registerFail(deferred){
		deferred.fail(function(){
			throw new Error("Some error");
		});
	}

	function registerAlways(deferred){
		deferred.always(function(){
			throw new Error("Some error");
		});
	}

	function registerException(){
		$('body').one('exception', function(event, error){
			exceptionRaised = error;
		});

		waitsFor(function(){
			return exceptionRaised;
		});
	}
});