describe('A guest clicks on announcement to see more info', function(){
	
	var _announcement = $("<section>").data("widget", "announcement");
	
	beforeEach(function(){
		var _loaded = false;
		
		require(['util/loader'], function(){
			_loaded = true;
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
	});
	
	it('should show information about an announcement', function(){
		//Given an announcement widget is open
		var _loaded = false;
		_announcement.data('widgetparams', '1');
		
		//When loading the information into the widget
		_announcement.widget().then(function(){
			_loaded = true;
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		runs(function(){
			//Then The title of the announcement should be visible
			//  The person who announced it should be visible
			//  The date and time of the announcement should be visible
			//  The message of the announcement should be visilbe
			expect(_announcement.find('.pv-title:first').text()).toEqual('Guild Wars 2 Launch');
			expect(_announcement.find('.pv-name:first').text()).toEqual('EnoF');
			expect(_announcement.find('.pv-date:first').text()).toEqual('13-08-2012');
			expect(_announcement.find('.pv-time:first').text()).toEqual('22:00');
			expect(_announcement.find('.pv-message:first').text()).toEqual('Guild Wars 2 will be launching 25th August for those who pre purchased!');
		});
	});
	
});