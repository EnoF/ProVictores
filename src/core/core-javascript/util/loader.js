define(function(){
	var _private = {
		basePath : "./",
		loadCss : function(page){
			var _link = $('<link href="' + _private.basePath + page + '/css/style.css" type="text/css" rel="stylesheet">'),
				_hasBeenLoadedBefore = $('head').find('link[href="'+ _private.basePath + page + '/css/style.css"]').length > 0;
			if(!_hasBeenLoadedBefore){
				$('head').append(_link);
			}			
		}
	},
	_public = {
		getBasePath : function(){
			return _private.basePath;
		},
		setBasePath : function(basePath){
			_private.basePath = basePath;
		},
		loadPage : function(page){
			return $.ajax({
				url : _private.basePath + page + "/index.html"
			});
		},
		loadWidgetPage : function(page, params){
			var _deferred = $.Deferred();
			
			_public.loadPage(page).then(function(html){
				var _html = $("<html>").html(html),
					_article = _html.find("article");
					
				if(_article.length === 0){
					throw new Error("No Article found");
				}
				require({paths : { 'widget' : '../..'}},['widget/' + page + '/src/app'], function(app){
					try{
						app.initialize(_article, params);
						_private.loadCss(page);
						_deferred.resolve(_article);
					}catch(e){
						console.error(e);
						_deferred.reject(e);
					}
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
			_widgetParams = this.data('widgetParams'),
			_deferred = $.Deferred();
		_public.loadWidgetPage(_widgetPage, _widgetParams).then(function(article){
			var _subWidgetDeferred = [];
			_widget.empty();
			article.addClass("pv-" + _widgetPage);
			article.find("[data-widget]").each(function(){
				_subWidgetDeferred.push($(this).widget());
			});
			$.when.apply($, _subWidgetDeferred).then(function(){
				_widget.append(article);
				_widget.trigger("initialized");
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
