define(['util/loader'],
function(loader){
	var _private = {
			extention : '',
			isTestMode : false,
			getUrl : function(resource, method){
				var _ext = _private.isTestMode ? method + _private.extention : '';
				return loader.getBasePath() + '../test/' + resource + _ext;
			}
		},
		_public = {
			testModeOn : function(){
				_private.extention = ".json";
				_private.isTestMode = true;
			},
			get : function(resource, params){
				return $.ajax({
					url : _private.getUrl(resource, '/get'),
					params : params
				});
			},
			post : function(){
				
			},
			put : function(){
				
			},
			del : function(){
				
			}
		};
	//Test mode is now always on, as there are no services available yet
	_public.testModeOn();
	return _public;
});
