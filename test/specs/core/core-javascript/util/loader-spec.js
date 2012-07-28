describe('module : loader', function(){
	
	var loader,
		_homeTitle = "Welcome to ProVictores",
		_homeText = "This is the guild website of ProVictores!";
	
	beforeEach(function(){
		
		waitsFor(function(){			
			require(['util/loader'],
			function(loaderModule){
				loader = loaderModule;
			});
			
			return loader !== undefined;
		});
		
	});
	
	it('should be able to load home page', function(){
		// Given Loader is loaded
		var _loaded = false,
			_html,
			_article;
		expect(loader).toBeDefined();
		
		//When Loading the widget page Home
		loader.loadPage('home').then(function(html){
			_loaded = true;
			_html = $("<html>").html(html);
			_article = _html.find("article");
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		//Then The page should be an html page containing
		//  a h2 with as text Welcome to ProVictores
		//  a p with as text This is the guild website of ProVictores!
		runs(function(){
			expect(_loaded).toBeTruthy();
			expect(_article.find("h2").text()).toEqual(_homeTitle);
			expect(_article.find("p").text()).toEqual(_homeText);
		});
	});
	
	it('should be able to load a widget page', function(){
		//Given loader is loaded
		var _loaded = false,
			_article;
		
		//When Loading the widget page of Home
		loader.loadWidgetPage('home').then(function(article){
			_loaded = true;
			_article = article;
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		//Then The article of the widget should append to the target section
		runs(function(){
			expect(_loaded).toBeTruthy();
			expect(_article.length > 0).toBeTruthy();
			expect(_article.find("h2").text()).toEqual(_homeTitle);
			expect(_article.find("p").text()).toEqual(_homeText);
		});
	});
	
	describe("Loading widgets", function(){
		
		it('should empty the container before loading the widget', function(){
			//Given Loader is loaded
			//  target location is a new section
			var _loaded = false,
				_section = $("<section>").data("widget", "home").append($('<div>').addClass("test")),
				_article;
			
			//When Loading the Home Widget a new section
			_section.widget().then(function(){
				_loaded = true;
				_article = _section.find(".pv-home");
			});
			
			waitsFor(function(){
				return _loaded;
			});
			
			//Then The article of the widget should be in the new section
			runs(function(){
				expect(_loaded).toBeTruthy();
				expect(_article.length > 0).toBeTruthy();
				expect(_section.find(".test").length === 0).toBeTruthy();
				expect(_article.find("h2:first").text()).toEqual(_homeTitle);
				expect(_article.find("p:first").text()).toEqual(_homeText);
			});
		});
		
		it('should load subwidgets if there are any widgets to load', function(){
			//Given Loader is loaded
			//  target location is a new section
			var _loaded = false,
				_section = $("<section>").data("widget", "home"),
				_guildmembersWidget,
				_homeWidget;
			
			//When Loading the Home Widget a new section
			_section.widget().then(function(){
				_loaded = true;
				_homeWidget = _section.find(".pv-home");
				_guildmembersWidget = _homeWidget.find(".pv-guildmembers");
			});
			
			waitsFor(function(){
				return _loaded;
			});
			
			//Then The article of the widget should be in the new section
			runs(function(){
				expect(_loaded).toBeTruthy();
				expect(_guildmembersWidget.length > 0).toBeTruthy();
			});
		});
		
<<<<<<< HEAD
=======
		it('should pass along params for widget initialisation', function(){
			//Given Loader is loaded
			//  target location is a new section
			//  target location has params
			var _loaded = false,
				_section = $("<section>").data("widget", "guildmember").
								data("widgetParams", {
									name : "EnoF",
									rank : "Guild Leader"
								}),
				_article;
			
			//When Loading the Home Widget a new section
			_section.widget().then(function(){
				_loaded = true;
				_article = _section.find(".pv-guildmember");
			});
			
			waitsFor(function(){
				return _loaded;
			});
			
			//Then The article of the widget should be in the new section
			runs(function(){
				expect(_loaded).toBeTruthy();
				expect(_article.length > 0).toBeTruthy();
				expect(_article.find('.pv-guildmember-name').text()).toEqual('EnoF');
				expect(_article.find('.pv-guildmember-rank').text()).toEqual('Guild Leader');
			});
		});
		
		it('should fire initialized event when the widget has initialized', function(){
			//Given Loader is loaded
			//  target location is a new section
			var _loaded = false,
				_section = $("<section>").data("widget", "home");
			
			//When Loading the Home Widget a new section
			_section.widget();
			
			_section.on('initialized', function(){
				_loaded = true;
			});
			
			waitsFor(function(){
				return _loaded;
			});
			
			//Then The article of the widget should be in the new section
			runs(function(){
				expect(_loaded).toBeTruthy();
			});
		});
		
>>>>>>> e55454f12f6a3ac13db49d365c6cee01a8148b2e
	});
});
