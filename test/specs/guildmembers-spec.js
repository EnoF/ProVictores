describe('A guest visits the guild page to apply for our guild', function(){
	
	var _guildmembersWidget = $("<section>").data("widget", "guildmembers");
	
	beforeEach(function(){
		$('body').append($('<section>').addClass('.testArea'));
		$('.testArea').append(_guildmembersWidget);
		loadWidget();
	});
	
	afterEach(function(){
		$('.testArea').remove();
	});
	
	it('should be able to show a list of all guild members', function(){
		//Given The Guildmembers widget has a section
		//  _guildmembersWidget is our section
		var _list;
		 
		//When The Guest opens the widget
		//  the widget has been loaded in the before each
		_list = _guildmembersWidget.find('ol');
		
		//Then The Guest should see a list of Guild Members
		expect(_list.find('li').length > 0).toBeTruthy();
	});
	
	it('should be able to look through our member list to see the details of a guild member', function(){
		//Given The widget contains a list of members
		var _list = _guildmembersWidget.find('ol'),
			_loaded;
		
		//When The Guest clicks on a Guild member
		_list.find('li:first').click();
		
		_list.on('initialized', function(){
			_loaded = true;
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		//Then The Guest should see the Guild Member widget
		runs(function(){
			expect(_guildmembersWidget.find('.pv-guildmember').length > 0).toBeTruthy();
		});
	});
	
	function loadWidget(){
		
		var _loaded = false;
		
		require(['util/loader'], function(){
			_guildmembersWidget.widget().then(function(){
				_loaded = true;
			});
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
	}
});
