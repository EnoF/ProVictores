describe('A guest launches a widget from the launch bar opening a new widget', function(){
	
	var _launcher = $("<section>");
	
	beforeEach(function(){
		$('body').append($('<section>').addClass('testArea'));
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
			
		launchWidget('aboutprovictores');
		
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
		
		launchWidget('aboutprovictores');
		
		//When The Guild Members widget is launched
		launchWidget('guildmembers');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-previous .pv-aboutprovictores').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-current .pv-guildmembers').length).toBeGreaterThan(0);
		});
	});
	
	it('should hide widgets which were previously in the previous state', function(){
		//Given The about widget is launched
		var _loaded = false;
		_launcher.data('widget', 'launcher');
		loadWidget();
		
		launchWidget('aboutprovictores');
		
		//When The Guild Members widget is launched
		launchWidget('guildmembers');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		launchWidget('home');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-aboutprovictores').length).toEqual(0);
			expect(_launcher.find('.pv-previous .pv-guildmembers').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-current .pv-home').length).toBeGreaterThan(0);
		});
	});
	
	it('should reuse an widget if it was opened before', function(){
		//Given The about widget is launched
		var _loaded = false;
		_launcher.data('widget', 'launcher');
		loadWidget();
		
		launchWidget('aboutprovictores');
		
		//When The Guild Members widget is launched		
		launchWidget('guildmembers');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		launchWidget('aboutprovictores');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-aboutprovictores').length).toBeGreaterThan(0);
			expect(_launcher.find('.pv-aboutprovictores').length).toBeLessThan(2);
			expect(_launcher.find('.pv-current').length).toBeLessThan(2);
		});
	});
	
	it('should not reload a widget if the widget was a child widget', function(){
		//Given The about widget is launched
		var _loaded = false;
		_launcher.data('widget', 'launcher');
		loadWidget();
		
		launchWidget('home');
		
		//When The Guild Members widget is launched
		launchWidget('aboutprovictores');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		launchWidget('home');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		launchWidget('guildmembers');
		
		//Then The about widget should have the .pv-previous class
		//  The Guild Members widget should have the .pv-current class
		runs(function(){
			expect(_launcher.find('.pv-aboutprovictores').length).toEqual(0);
			expect(_launcher.find('.pv-aboutprovictores').length).toBeLessThan(2);
			expect(_launcher.find('.pv-current').length).toBeLessThan(2);
			expect(_launcher.find('.pv-forward').length).toBeLessThan(2);
		});
	});
	
	function launchWidget(widgetId){
		var _loaded = false;
		
		runs(function(){
			//When The About link is clicked
			_launcher.one('initialized', function(){
				_loaded = true;
			});		
			_launcher.find('#launch-' + widgetId).click();
		});
		
		waitsFor(function(){
			return _loaded;
		});
	}
	
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