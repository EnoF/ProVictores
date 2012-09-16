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
