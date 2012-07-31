describe('A guest launches a widget from the launch bar opening a new widget', function(){
	
	var _launcher = $("<section>");
	
	beforeEach(function(){
		$('body').append($('<section>').addClass('.testArea'));
		$('.testArea').append(_launcher);
	});
	
	afterEach(function(){
		_launcher = $("<section>");
		$('.testArea').remove();
	});
	
	it('should load the widget with information about ProVictores', function(){
		//Given The about widget is defined
		var _loaded = false;
		_launcher.data("widget", "launcher");
		loadWidget();
			
		runs(function(){
			//When The About link is clicked
			_launcher.find('#launch-aboutprovictores').click();
			_launcher.one('initialized', function(){
				_loaded = true;
			});		
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		runs(function(){
			//Then the widget should have a navigation element
			//  The about widget should be loaded in the context
			expect(_launcher.find('nav').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-aboutprovictores').length).toBeGreaterThan(0);
		});
	});
	
	function loadWidget(){
		
		var _loaded = false;
		
		require(['util/loader'], function(){
			_launcher.widget().then(function(){
				_loaded = true;
			});
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
	}
});