define(function(){
	function Deferred(){
		var _deferred = $.Deferred(),
			_originalThen = _deferred.then;
		
		_deferred.then = function(promise){
			_originalThen(function(){
				try{
					promise.apply(_deferred, arguments);
				}catch(e){
					$("body").trigger('exception', e);
				}
			});
			return this;
		};
		
		return _deferred;
	}
	return Deferred;
});
