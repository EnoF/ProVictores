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
		
		it('should be able to subscribe on multiple deferreds', function(){
			var _subscriber = new Deferred(),
				_publisher = new Deferred(),
				_otherPublisher = new Deferred(),
				_resolved = false,
				_rejected = false;
				
			_subscriber.subscribe(_publisher, _otherPublisher);
			
			_subscriber.then(function(){
				_resolved = true;
			});
			
			_subscriber.fail(function(){
				_rejected = true;
			});
			
			_publisher.resolve();
			_otherPublisher.resolve();
			
			waitsFor(function(){
				return _resolved;
			});
			
			runs(function(){
				expect(_resolved).toBeTruthy();
				expect(_rejected).toBeFalsy();
			});
		});
		
		it('should reject a subscribe whenever one of the deferreds fail', function(){
			var _subscriber = new Deferred(),
				_publisher = new Deferred(),
				_otherPublisher = new Deferred(),
				_resolved = false,
				_rejected = false;
				
			_subscriber.subscribe(_publisher, _otherPublisher);
			
			_subscriber.then(function(){
				_resolved = true;
			});
			
			_subscriber.fail(function(){
				_rejected = true;
			});
			
			_publisher.resolve();
			_otherPublisher.reject();
			
			waitsFor(function(){
				return _rejected;
			});
			
			runs(function(){
				expect(_resolved).toBeFalsy();
				expect(_rejected).toBeTruthy();
			});
		});
	});
	
	function registerThen(deferred){
		deferred.then(function(){
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
