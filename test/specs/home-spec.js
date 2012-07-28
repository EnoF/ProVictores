describe('A guest visits the home page to gain quick access to important features of the guild website', function(){
	
	var _homeWidget = $("<section>").data("widget", "home");
	
	beforeEach(function(){
		var _loaded = false;
		
		require(['util/loader'], function(){
			_homeWidget.widget().then(function(){
				_loaded = true;
			});
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
	});
	
	it('should show a list of all guild members', function(){
		//Given The Guest is on the Home Screen
		expect(_homeWidget.find("article").length > 0).toBeTruthy();
		
		//When home widget is loaded
		//loaded in the beforeEach
		
		//Then The Guest should see the guildmembers widget
		expect(_homeWidget.find('.pv-guildmembers').length > 0).toBeTruthy();
	});
	
});