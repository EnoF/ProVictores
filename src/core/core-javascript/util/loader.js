define(function(){
	var _private = {
		basePath : "./",
		loadCss : function(page){
			var _link = $('<link href="' + _private.basePath + page + '/css/style.css" type="text/css" rel="stylesheet">'),
				_hasBeenLoadedBefore = $('head').find('link[href="'+ _private.basePath + page + '/css/style.css"]').length > 0;
			if(!_hasBeenLoadedBefore){
				$('head').append(_link);
			}			
		},
		loadApp : function(app, article, params){
			try{
				return app.initialize(article, params);
			}catch(e){
				console.error(e);
				return $.Deferred().reject(e);
			}
		},
		initializePage : function(page, params, html){
			var _html = $("<html>").html(html),
				_article = _private.getArticle(_html),
				_deferred = $.Deferred();
				
			require({paths : { 'widget' : '../..'}},['widget/' + page + '/src/app'], function(app){
				_private.loadCss(page);
				_private.loadApp(app, _article, params).then(function(){
					_deferred.resolve(_article);
				});
			});
			
			return _deferred;
		},
		getArticle : function(html){
			var _article = html.find("article");
			if(_article.length === 0){
				throw new Error("No Article found");
			}
			return _article;
		},
		loadHtml : function(html){
			var _html = $("<html>").html(html),
				_article = _html.find("article");
				
			if(_article.length === 0) throw new Error("No Article found");
			
			return _article;
		}
	},
	_public = {
		getBasePath : function(){
			return _private.basePath;
		},
		setBasePath : function(basePath){
			_private.basePath = basePath;
		},
		loadPage : function(page, params){
			var _deferred = $.Deferred();
			
			$.ajax({
				url : _private.basePath + page + "/index.html"
			}).then(function(html){
				_private.initializePage(page, params, html).then(function(article){
					_deferred.resolve(article);
				});
			});
			
			return _deferred;
		},
		loadTemplate : function(page, template){
			var _deferred = $.Deferred();
			$.ajax({
				url : _private.basePath + page + '/templates/'+ template + ".html"
			}).then(function(html){
				var _article = _private.loadHtml(html);
				_deferred.resolve(_article);
			}).fail(function(){
				_deferred.reject();
			});
			
			return _deferred;
		},
		loadWidgetPage : function(page, params){
			return _public.loadPage(page, params);
		}
	};
	
	//Binding widget as a jQuery plugin
	$.fn.widget = function(){
		//The widget to load
		var _widget = this,
			_widgetPage = this.data('widget'),
			_widgetParams = this.data('widgetparams'),
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
				_widget.trigger("initialized", _widget);
				_deferred.resolve();
			}).fail(function(){
				_deferred.reject();
			});
		}).fail(function(){
			_deferred.reject();
		});
		return _deferred;
	};
	
	$.fn.destroy = function(){
		this.trigger("destroyed", this);
		this.remove();
	};
	
	return _public;
});
