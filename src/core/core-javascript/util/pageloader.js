define(function(){
	var _private = {
		basePath : "/src/"
	},
	_public = {
		setBasePath : function(basePath){
			_private.basePath = basePath;
		},
		loadPage : function(page){
			return $.ajax({
				url : _private.basePath + page + "/index.html"
			});
		}
	};
	
	return _public;
});
