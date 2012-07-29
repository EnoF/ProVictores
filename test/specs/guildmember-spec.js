describe('A guest clicks on guildmember to see more info', function(){
	
	var _guildmemberWidget = $("<section>");
	
	beforeEach(function(){
		$('body').append($('<section>').addClass('.testArea'));
		$('.testArea').append(_guildmemberWidget);
	});
	
	afterEach(function(){
		_guildmemberWidget = $("<section>");
		$('.testArea').remove();
	});
	
	it('should load the widget with a given member', function(){
		//Given the user
		//  EnoF Guild Leader
		_guildmemberWidget.
			data("widget", "guildmember").
			data("widgetParams", 1);
			
		//When The widget is loaded
		loadWidget();
		
		//Then the widget should have the member as context
		runs(function(){
			expect(_guildmemberWidget.find('.pv-guildmember-name').text()).toEqual('EnoF');
			expect(_guildmemberWidget.find('.pv-guildmember-rank').text()).toEqual('Guild Leader');
		})
	});
	
	function loadWidget(){
		
		var _loaded = false;
		
		require(['util/loader'], function(){
			_guildmemberWidget.widget().then(function(){
				_loaded = true;
			});
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
	}
});