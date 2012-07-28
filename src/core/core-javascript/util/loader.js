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
				require({paths : { 'widget' : '../..'}},['widget/' + page + '/src/app'], function(app){
					app.initialize(_article);
					_deferred.resolve(_article);
				});
			}).fail(function(error){
				_deferred.reject(error);
			});
			
			return _deferred;
		}
	};
	
	//Binding widget as a jQuery plugin
	$.fn.widget = function(){
		//The widget to load
		var _widget = this,
			_widgetPage = this.data('widget'),
			_deferred = $.Deferred();
		_public.loadWidgetPage(_widgetPage).then(function(article){
			var _subWidgetDeferred = [];
			_widget.empty();
			article.addClass("pv-" + _widgetPage);
			article.find("[data-widget]").each(function(){
				_subWidgetDeferred.push($(this).widget());
			});
			$.when.apply($, _subWidgetDeferred).then(function(){
				_widget.append(article);
				_deferred.resolve();
			}).fail(function(){
				_deferred.reject();
			});
		}).fail(function(){
			_deferred.reject();
		});
		return _deferred;
	};
	
	return _public;
});
