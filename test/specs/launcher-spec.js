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
	
	it('should place a loaded widget in the previous widget spot when launching a new widget', function(){
		//Given The about widget is launched
		var _loaded = false;
		_launcher.data('widget', 'launcher');
		loadWidget();
		
		runs(function(){
			_launcher.find('#launch-aboutprovictores').click();
			_launcher.one('initialized', function(){
				_loaded = true;
			});	
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		//When The Guild Members widget is launched
		runs(function(){
			_loaded = false;
			_launcher.find('#launch-guildmembers').click();
			_launcher.one('initialized', function(){
				_loaded = true;
			});	
		});
		
		waitsFor(function(){
			return _loaded;
		});
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-previous .pv-aboutprovictores').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-current .pv-guildmembers').length).toBeGreaterThan(0);
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