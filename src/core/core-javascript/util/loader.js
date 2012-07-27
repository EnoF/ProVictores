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
		},
		loadWidgetPage : function(page){
			var _deferred = $.Deferred();
			
			_public.loadPage(page).then(function(html){
				var _html = $("<html>").html(html),
					_article = _html.find("article");
					
				if(_article.length === 0){
					throw new Error("No Article found");
				}
				
				_deferred.resolve(_article);
			}).fail(function(error){
				_deferred.reject(error);
			});
			
			return _deferred;
		}
	};
	
	return _public;
});
