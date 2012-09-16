define(function(){
	function Deferred(){
		var _deferred = $.Deferred(),
			_originalThen = _deferred.then,
			_originalFail = _deferred.fail;
		
		function executePromise(promise, params){
			try{
				promise = promise || function(){};
				promise.apply(_deferred, params);
			}catch(e){
				$("body").trigger('exception', e);
			}
		}
		
		_deferred.then = function(promise){
			_originalThen(function(){
				executePromise(promise, arguments);
			});
			return _deferred;
		};
		
		_deferred.fail = function(promise){
			_originalFail(function(){
				executePromise(promise, arguments);
			});
			return _deferred;
		};
		
		_deferred.subscribe = function(publisher){
			publisher.then(function(){
				_deferred.resolve.apply(_deferred, arguments);
			}).fail(function(){
				_deferred.reject.apply(_deferred, arguments);
			});
		};
		
		return _deferred;
	}
	return Deferred;
});
