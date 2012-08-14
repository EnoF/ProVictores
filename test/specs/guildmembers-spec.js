describe('A guest visits the guild page to apply for our guild', function(){
	
	var _guildmembersWidget,
		_loaded = false;
	
	require(['util/loader'], function(){
		_loaded = true;
		waitsFor(function(){
			return _loaded;
		});
	});
	
	afterEach(function(){
		$('.testArea').remove();
	});
	
	describe('Normal state of Guildmembers widget', function(){
		
		beforeEach(function(){
			_guildmembersWidget =  $("<section>").data("widget", "guildmembers");
			$('body').append($('<section>').addClass('testArea'));
			$('.testArea').append(_guildmembersWidget);
			loadWidget();
		});
		
		it('should be able to show a list of all guild members retrieved from services', function(){
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
			
			//When The Guest clicks on a Guild member
			clickMember('li:first');
			
			//Then The Guest should see the Guild Member widget
			runs(function(){
				expect(_guildmembersWidget.find('.pv-guildmember').length > 0).toBeTruthy();
			});
		});
		
		it('should destroy the guildmember widget when opening a new guildmember widget', function(){
			//Given The widget already has a guildmember widget open
			clickMember('li:first');
				
			//When clicking an other member
			runs(function(){
				clickMember('li:last');
			});
			
			//Then the new guildmember widget should be the only one open
			runs(function(){
				expect(_guildmembersWidget.find('li').length).toBeGreaterThan(1);
				expect(_guildmembersWidget.find('.pv-guildmember').length).toBeLessThan(2);
				expect(_guildmembersWidget.find('.pv-guildmember').length).toBeGreaterThan(0);
			});
			
		});
	
	});
	
	describe('Small state of Guildmembers widget', function(){
		
		beforeEach(function(){
			_guildmembersWidget =  $("<section>").data("widget", "guildmembers").data('widgetparams', 'small');
			$('body').append($('<section>').addClass('testArea'));
			$('.testArea').append(_guildmembersWidget);
			loadWidget();
		});
		
		it('should not open guildmembers widget when clicked on the guildmember when in small state', function(){
			//Given the widget is opened in small state
			
			//When clicking on a guildmember
			clickMember('li:first');
			
			//Then there shouldn't be a guildmember widget opened
			runs(function(){
				expect(_guildmembersWidget.find('.pv-guildmember').length).toEqual(0);
			});
		});
		
	});
	
	function clickMember(member){
		var _list = _guildmembersWidget.find('ol'),
			_loaded;
		
		//If the widget is initialized
		_guildmembersWidget.one('initialized', function(){
			_loaded = true;
		});
		
		//If the widget in small state is requested to open
		_guildmembersWidget.one('guildmembers.open', function(){
			_loaded = true;
		});
		
		_list.find(member).click();
		
		waitsFor(function(){
			return _loaded;
		});
	}
	
	function loadWidget(){
		var _loaded = false;
		
		_guildmembersWidget.widget().then(function(){
			_loaded = true;
		});
		
		waitsFor(function(){
			return _loaded;
		});
	}
});
