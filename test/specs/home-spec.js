describe('A guest visits the home page to gain quick access to important features of the guild website', function(){
	
	var _homeWidget = $("<section>").data("widget", "home"),
		_loaded = false;
	
	require(['util/loader'], function(){
		_loaded = true;
		waitsFor(function(){
			return _loaded;
		});
	});
	
	
	describe('Home widget', function(){
			
		beforeEach(function(){
			var _loaded = false;
			
			_homeWidget.widget().then(function(){
				_loaded = true;
			});
			
			waitsFor(function(){
				return _loaded;
			});
			
		});
		
		it('should show the guildmembers widget', function(){
			//Given The Guest is on the Home Screen
			expect(_homeWidget.find("article").length > 0).toBeTruthy();
			
			//When home widget is loaded
			//loaded in the beforeEach
			
			//Then The Guest should see the guildmembers widget
				//The guildmembers widget should be loaded in small state
			expect(_homeWidget.find('.pv-guildmembers').length > 0).toBeTruthy();
			expect(_homeWidget.find('section[data-widget=guildmembers]').data('widgetparams')).toEqual('small');
		});
	});
	
});